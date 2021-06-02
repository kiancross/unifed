/*
 * Copyright (C) 2021 Kian Cross
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import got, { Got, OptionsOfJSONResponseBody, HTTPAlias } from "got";
import { config } from "@unifed/backend-core";

/**
 * Type representing a REST endpoint.
 *
 * @internal
 */
export type Endpoints = string | string[];

/**
 * HTTP federation client. Wrapper around the Got library,
 * with additional options set.
 *
 * @internal
 */
export class FederationHttpClient {
  readonly httpClient: Got;

  /**
   * @param host  Host of the server to send requests.
   *
   * @param username  Username of the user for which requests
   *                  are being sent on behalf of.
   */
  constructor(host: string, username?: string) {
    this.httpClient = got.extend({
      prefixUrl: `http://${host}/fed`,
      headers: {
        "Client-Host": config.siteHost,
        "User-ID": username,
      },
    });
  }

  /**
   * Joins an array of endpoints into a string.
   *
   * @param endpoints  The endpoints to join.
   */
  private joinEndpoints(endpoints: Endpoints): string {
    if (typeof endpoints === "string") {
      endpoints = [endpoints];
    }

    const trimmedEndpoints = [];

    for (const endpoint of endpoints) {
      const trimmedEndpoint = endpoint.replace(/(^\/|\/$)/g, "");
      trimmedEndpoints.push(trimmedEndpoint);
    }

    return trimmedEndpoints.join("/");
  }

  /**
   * Makes a request using the Got library, setting some default
   * options required for federation
   *
   * @param endpoints  The endpoints to join.
   * @param method  The HTTP method to use.
   * @param options Optional options to use in the request.
   */
  async request<T>(
    endpoints: Endpoints,
    method: HTTPAlias,
    options?: OptionsOfJSONResponseBody,
  ): Promise<T> {
    const response = await this.httpClient<T>(this.joinEndpoints(endpoints), {
      ...options,
      method,
      responseType: "json",
    });

    return response.body;
  }

  /**
   * GET wrapper around [[`FederationHttpClient.request`]].
   */
  async get<T>(endpoints: Endpoints, options?: OptionsOfJSONResponseBody): Promise<T> {
    return await this.request<T>(endpoints, "get", options);
  }

  /**
   * POST wrapper around [[`FederationHttpClient.request`]].
   */
  async post<T>(endpoints: Endpoints, options?: OptionsOfJSONResponseBody): Promise<T> {
    return this.request<T>(endpoints, "post", options);
  }

  /**
   * PUT wrapper around [[`FederationHttpClient.request`]].
   */
  async put<T>(endpoints: Endpoints, options?: OptionsOfJSONResponseBody): Promise<T> {
    return this.request<T>(endpoints, "put", options);
  }

  /**
   * DELETE wrapper around [[`FederationHttpClient.request`]].
   */
  async delete<T>(endpoints: Endpoints, options?: OptionsOfJSONResponseBody): Promise<T> {
    return this.request<T>(endpoints, "delete", options);
  }
}
