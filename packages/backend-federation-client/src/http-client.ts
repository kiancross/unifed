/*
 * CS3099 Group A3
 */

import got, { Got, OptionsOfJSONResponseBody, HTTPAlias } from "got";

type Endpoints = string | string[];

export class FederationHttpClient {
  readonly httpClient: Got;

  constructor(hostname: string) {
    this.httpClient = got.extend({
      prefixUrl: `http://${hostname}/fed`,
    });
  }

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

  async get<T>(endpoints: Endpoints, options?: OptionsOfJSONResponseBody): Promise<T> {
    return await this.request<T>(endpoints, "get", options);
  }

  async post<T>(endpoints: Endpoints, options?: OptionsOfJSONResponseBody): Promise<T> {
    return this.request<T>(endpoints, "post", options);
  }

  async put<T>(endpoints: Endpoints, options?: OptionsOfJSONResponseBody): Promise<T> {
    return this.request<T>(endpoints, "put", options);
  }

  async delete<T>(endpoints: Endpoints, options?: OptionsOfJSONResponseBody): Promise<T> {
    return this.request<T>(endpoints, "delete", options);
  }
}
