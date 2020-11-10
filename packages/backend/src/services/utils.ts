/*
 * CS3099 Group A3
 */

export function getFederatedApiEndpoint(hostname: string, endpoints: string[]): string {
  const trimmedHostname = hostname.replace(/\/$/, "");
  const trimmedEndpoints = [];

  for (const endpoint of endpoints) {
    trimmedEndpoints.push(endpoint.replace(/(^\/|\/$)/g, ""));
  }

  const endpoint = trimmedEndpoints.join("/");

  return `http://${trimmedHostname}/fed/${endpoint}`;
}
