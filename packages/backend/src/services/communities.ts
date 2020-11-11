/*
 * CS3099 Group A3
 */

import got from "got";
import { getFederatedApiEndpoint } from "./utils";
import { Community } from "../models";

export async function getCommunities(host: string): Promise<Community[]> {
  const communityIds: string[] = await got(getFederatedApiEndpoint(host, ["communities"])).json();

  const communities = [];

  for (let i = 0; i < communityIds.length; i++) {
    const community = await getCommunity(host, communityIds[i]);

    if (community === null) {
      throw Error("Community not found");
    }

    communities.push(community);
  }

  return communities;
}

export async function getCommunity(host: string, id: string): Promise<Community | null> {
  try {
    return await got(getFederatedApiEndpoint(host, ["communities", id])).json();
  } catch (error) {
    if (error.response.statusCode === 404) {
      return null;
    } else {
      throw error;
    }
  }
}
