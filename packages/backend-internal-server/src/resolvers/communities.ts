/*
 * CS3099 Group A3
 */

import {
  Resolver,
  FieldResolver,
  ResolverInterface,
  Root,
  Query,
  Mutation,
  Subscription,
  PubSub,
  PubSubEngine,
  Arg,
} from "type-graphql";
import { Service } from "typedi";
import { Community, Post, User } from "@unifed/backend-core";
import { CurrentUser } from "./helpers";
import { AuthoriseUser } from "../auth-checkers";
import { RemoteReferenceInput } from "./inputs";
import { translateHost } from "./helpers";
import { CommunitiesService, PostsService } from "../services";
import { CommunityCall } from "./types";

@Service()
@Resolver(Community)
export class CommunitiesResolver implements ResolverInterface<Community> {
  constructor(
    private readonly communitiesService: CommunitiesService,
    private readonly postsService: PostsService,
  ) {}

  @AuthoriseUser()
  @Subscription({
    topics: "COMMUNITY_CALL",
    filter: ({ payload, context }) => {
      if (!context.user || payload.from === context.user.username) {
        return false;
      }

      if (payload.type !== "request" && payload.to !== context.user.username) {
        return false;
      }

      return true;
    },
  })
  communityCalls(@Arg("community") _: string, @Root() payload: CommunityCall): CommunityCall {
    return payload;
  }

  @AuthoriseUser()
  @Mutation(() => Boolean)
  async requestCommunityCall(
    @Arg("community") community: string,
    @PubSub() pubSub: PubSubEngine,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    const payload: CommunityCall = {
      type: "request",
      community,
      from: user.username,
    };

    await pubSub.publish("COMMUNITY_CALL", payload);

    return true;
  }

  @Mutation(() => Boolean)
  async respondCommunityCall(
    @Arg("type") type: "offer" | "request" | "ice",
    @Arg("community") community: string,
    @Arg("user") to: string,
    @Arg("sdp") sdp: string,
    @PubSub() pubSub: PubSubEngine,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    const payload: CommunityCall = {
      type,
      community,
      sdp,
      to,
      from: user.username,
    };

    await pubSub.publish("COMMUNITY_CALL", payload);

    return true;
  }

  @AuthoriseUser()
  @Mutation(() => Boolean)
  async createCommunity(
    @Arg("id") id: string,
    @Arg("title") title: string,
    @Arg("description") description: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return await this.communitiesService.create(user.username, id, title, description);
  }

  @Query(() => [Community])
  async getCommunities(@Arg("host") host: string): Promise<Community[]> {
    return await this.communitiesService.getAll(await translateHost(host));
  }

  @Query(() => Community, { nullable: true })
  async getCommunity(@Arg("community") community: RemoteReferenceInput): Promise<Community | null> {
    return await this.communitiesService.getOne(await translateHost(community.host), community.id);
  }

  @FieldResolver()
  async posts(@Root() community: Community): Promise<Post[]> {
    if (community.host === undefined) {
      throw new Error("Host can not be undefined");
    }

    return await this.postsService.getByCommunity(
      await translateHost(community.host),
      community.id,
    );
  }
}
