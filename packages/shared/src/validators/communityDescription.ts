/*
 * CS3099 Group A3
 */

export function validateCommunityDescription(communityDescription: string): boolean {
  return /^.{1,128}$/.test(communityDescription);
}
