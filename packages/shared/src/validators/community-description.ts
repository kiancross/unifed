/*
 * CS3099 Group A3
 */

export function validateCommunityDescription(description: string): boolean {
  return /^.{1,128}$/.test(description);
}
