/*
 * CS3099 Group A3
 */

export class RemoteResponseError<T> extends Error {
  constructor(value: T) {
    super(`Invalid response: ${value}`);
  }
}

export function isStringArray<T>(values: T): boolean {

  if (!Array.isArray(values)) {
    return false;
  }

  for (const value of values) {
    if (typeof value !== "string") {
      return false;
    }
  }

  return true;
}

export function getFederatedApiEndpoint(hostname: string, endpoints: string[]): string {
  const trimmedHostname = hostname.replace(/\/$/, "");
  const trimmedEndpoints = [];

  for (let i = 0; i < endpoints.length; i++) {
    const endpoint = endpoints[i].replace(/(^\/|\/$)/g, "");
    trimmedEndpoints.push(endpoint);
  }

  const endpoint = trimmedEndpoints.join("/");

  return `http://${trimmedHostname}/fed/${endpoint}`;
}
