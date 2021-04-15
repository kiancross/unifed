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
import { Community, Post, User, translateHost } from "@unifed/backend-core";
import { CurrentUser } from "./helpers";
import { AuthoriseUser } from "../auth-checkers";
import { RemoteReferenceInput } from "./inputs";
import { CommunitiesService, PostsService } from "../services";
import { CommunityCallEvent } from "./types";

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
    filter: ({ payload, context, args }) => {
      if (args.community !== payload.community) {
        return false;
      }

      if (!context.user || payload.from === context.user.username) {
        return false;
      }

      if (payload.to !== undefined && payload.to !== context.user.username) {
        return false;
      }

      return true;
    },
  })
  communityCalls(
    @Arg("community") _: string,
    @Root() payload: CommunityCallEvent,
  ): CommunityCallEvent {
    return payload;
  }

  @Mutation(() => Boolean)
  async communityCallEvent(
    @PubSub() pubSub: PubSubEngine,
    @CurrentUser() user: User,
    @Arg("type") type: "request" | "offer" | "answer" | "ice",
    @Arg("community") community: string,
    @Arg("user", { nullable: true }) to?: string,
    @Arg("sdp", { nullable: true }) sdp?: string,
  ): Promise<boolean> {
    const payload: CommunityCallEvent = {
      type,
      community,
      sdp,
      to,
      from: user.username,
    };

    await pubSub.publish("COMMUNITY_CALL", payload);

    return true;
  }

  /**
   * Allows a user to create a community to moderate.
   *
   * @param id ID of the new community to make.
   *
   * @param title Title of the new community.
   *
   * @param description Description of the new community.
   *
   * @param user Currently logged in user.
   *
   * @returns True on success.
   *
   * @internal
   */
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

  /**
   * Fetches the communities available at a host.
   *
   * @param host The host server to search
   *
   * @returns An array of communities.
   *
   * @internal
   */
  @Query(() => [Community])
  async getCommunities(@Arg("host") host: string): Promise<Community[]> {
    return await this.communitiesService.getAll(await translateHost(host));
  }

  /**
   * Fetches a community on the federated network.
   *
   * @param community Reference to the community.
   *
   * @returns The community if it exists.
   *
   * @internal
   */
  @Query(() => Community, { nullable: true })
  async getCommunity(@Arg("community") community: RemoteReferenceInput): Promise<Community | null> {
    return await this.communitiesService.getOne(await translateHost(community.host), community.id);
  }

  @FieldResolver()
  async posts(@Root() community: Community, @CurrentUser() user: User): Promise<Post[]> {
    if (community.host === undefined) {
      throw new Error("Host can not be undefined");
    }

    return await this.postsService.getByCommunity(
      user.username,
      await translateHost(community.host),
      community.id,
    );
  }
}
