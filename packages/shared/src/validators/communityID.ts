/*
 * CS3099 Group A3
 */

export function validateCommunityID(username: string): boolean {
  return /^[a-zA-Z0-9-_]{1,24}$/.test(username);
}
