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
  Arg,
} from "type-graphql";
import { Service } from "typedi";
import { Community, Post, User } from "@unifed/backend-core";
import { CurrentUser } from "./helpers";
import { AuthoriseUser } from "../auth-checkers";
import { RemoteReferenceInput } from "./inputs";
import { translateHost } from "./helpers";
import { CommunitiesService, PostsService } from "../services";

@Service()
@Resolver(Community)
export class CommunitiesResolver implements ResolverInterface<Community> {
  constructor(
    private readonly communitiesService: CommunitiesService,
    private readonly postsService: PostsService,
  ) {}

  @AuthoriseUser()
  @Mutation(() => Boolean)
  async createCommunity(
    @Arg("id") id: string,
    @Arg("title") title: string,
    @Arg("description") description: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return await this.communitiesService.create(user.id, id, title, description);
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
