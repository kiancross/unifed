/*
 * CS3099 Group A3
 */

import { Resolver, Query, Arg } from "type-graphql";
import { communitiesService } from "../../services";
import { Community } from "../../models";

@Resolver(Community)
export class CommunitiesResolver /*implements ResolverInterface<Post> */ {
  @Query(() => [Community])
  async getCommunities(@Arg("host") host: string): Promise<Community[]> {
    return communitiesService.getCommunities(host);
  }
}
