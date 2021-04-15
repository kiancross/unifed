/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Community } from "@unifed/backend-core";
import { isStringArray, RemoteResponseError } from "./helpers";
import { FederationHttpClient } from "./http-client";

/**
 * Error thrown if a community is not found.
 *
 * @internal
 */
export class CommunityNotFoundError extends Error {
  /**
   * @param id  ID of the community that caused the error.
   */
  constructor(id: string) {
    super(`Community not found: ${id}`);
  }
}

/**
 * Service used for interacting with
 * [communities](https://kiancross.github.io/cs3099a-specification/#tag/Communities)
 * on a federated host.
 */
@Service()
export class CommunitiesFederationService {
  /**
   * Return all communities on a given host.
   *
   * @param host  Host to get communities from.
   *
   * @returns All communities on the given host.
   */
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

  /**
   * Returns information for a given community on a host.
   *
   * @param host  The host to get community information from.
   * @param id  The ID of the community.
   *
   * @returns Information about the community, or `null` if it does
   *          not exist.
   */
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
