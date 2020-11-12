/*
 * CS3099 Group A3
 */

import got from "got";
import { getFederatedApiEndpoint } from "./utils";
import { Community } from "../../models";

class CommunityNotFoundError extends Error {
  constructor(id: string) {
    super(`Community not found: ${id}`);
  }
}

export async function getCommunities(host: string): Promise<Community[]> {
  const communityIds: string[] = await got(getFederatedApiEndpoint(host, ["communities"])).json();
  const communities = [];

  for (const communityId of communityIds) {
    const community = await getCommunity(host, communityId);

    if (community === null) {
      throw new CommunityNotFoundError(communityId);
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
