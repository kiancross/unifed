/*
 * CS3099 Group A3
 */

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
