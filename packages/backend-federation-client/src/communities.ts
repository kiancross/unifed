/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Community } from "@unifed/backend-core";
import { isStringArray, RemoteResponseError } from "./helpers";
import { FederationHttpClient } from "./http-client";

export class CommunityNotFoundError extends Error {
  constructor(id: string) {
    super(`Community not found: ${id}`);
  }
}

@Service()
export class CommunitiesFederationService {
  async getAll(host: string): Promise<Community[]> {
    const httpClient = new FederationHttpClient(host);

    const communityIds: string[] = await httpClient.get("communities");

    if (!isStringArray(communityIds)) {
      throw new RemoteResponseError(communityIds);
    }

    const communities = [];

    for (const communityId of communityIds) {
      const community = await this.getOne(host, communityId);

      if (community === null) {
        throw new CommunityNotFoundError(communityId);
      }

      communities.push(community);
    }

    return communities;
  }

  async getOne(host: string, id: string): Promise<Community | null> {
    const httpClient = new FederationHttpClient(host);

    try {
      const rawCommunity: Community = await httpClient.get(["communities", id]);
      const community = plainToClass(Community, rawCommunity);
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
}
