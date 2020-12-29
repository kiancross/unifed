/*
 * CS3099 Group A3
 */

import { Resolver, FieldResolver, ResolverInterface, Root, Query, Arg } from "type-graphql";
import { communitiesClient, postsClient } from "unifed-backend-federation-client";
import { RemoteReferenceInput } from "./inputs";
import { Community, Post } from "unifed-backend-core";

@Resolver(Community)
export class CommunitiesResolver implements ResolverInterface<Community> {
  @Query(() => [Community])
  async getCommunities(@Arg("host") host: string): Promise<Community[]> {
    return await communitiesClient.getCommunities(host);
  }

  @Query(() => Community, { nullable: true })
  async getCommunity(@Arg("community") community: RemoteReferenceInput): Promise<Community | null> {
    return await communitiesClient.getCommunity(community.host, community.id);
  }

  @FieldResolver()
  async posts(@Root() community: Community): Promise<Post[]> {
    if (community.host === undefined) {
      throw new Error("Host can not be undefined");
    }

    return await postsClient.getPosts(community.host, community.id);
  }
}
