/*
 * CS3099 Group A3
 */

export function validateCommunityName(communityName: string): boolean {
  return /^.{1,64}$/.test(communityName);
}
