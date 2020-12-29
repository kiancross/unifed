/*
 * CS3099 Group A3
 */

import got from "got";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { getFederatedApiEndpoint, isStringArray, RemoteResponseError } from "./helpers";
import { Community } from "unifed-backend-core";

export class CommunityNotFoundError extends Error {
  constructor(id: string) {
    super(`Community not found: ${id}`);
  }
}

export async function getCommunities(host: string): Promise<Community[]> {
  const communityIds: string[] = await got(getFederatedApiEndpoint(host, ["communities"])).json();
  if (!isStringArray(communityIds)) {
    throw new RemoteResponseError(communityIds);
  }

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
    const rawCommunity = await got(getFederatedApiEndpoint(host, ["communities", id])).json();
    const community = plainToClass(Community, rawCommunity as Community);
    community.host = host;

    const validation = await validate(community);
    if (validation.length !== 0) {
      throw new RemoteResponseError(rawCommunity);
    }

    return community;
  } catch (error) {
    if (error?.response?.statusCode === 404) {
      return null;
    } else {
      throw error;
    }
  }
}
