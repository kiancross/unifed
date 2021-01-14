/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { Community } from "@unifed/backend-core";
import { communitiesClient } from "@unifed/backend-federation-client";
import { translateHost } from "./helpers";

@Service()
export class CommunitiesService {
  async getAll(host: string): Promise<Community[]> {
    return await communitiesClient.getCommunities(await translateHost(host));
  }

  async getOne(host: string, id: string): Promise<Community | null> {
    return await communitiesClient.getCommunity(await translateHost(host), id);
  }
}
