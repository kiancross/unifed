/*
 * CS3099 Group A3
 */

import { Resolver, Query, Arg } from "type-graphql";
import { communitiesService } from "../services";
import { RemoteReferenceInput } from "./inputs";
import { Community } from "../../models";

@Resolver(Community)
export class CommunitiesResolver {
  @Query(() => [Community])
  async getCommunities(@Arg("host") host: string): Promise<Community[]> {
    return await communitiesService.getCommunities(host);
  }

  @Query(() => Community, { nullable: true })
  async getCommunity(@Arg("community") community: RemoteReferenceInput): Promise<Community | null> {
    return await communitiesService.getCommunity(community.host, community.id);
  }
}
