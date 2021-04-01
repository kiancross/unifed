/*
 * CS3099 Group A3
 */

/**
 * Validates that the given description for a community
 * meets the validation requirements:
 *
 *  - At least 1 character.
 *  - No more than 128 characters.
 *  - Any type of character.
 *
 * @param description  The community's description.
 */
export const validateCommunityDescription = (description: string): boolean => {
  return /^.{1,128}$/.test(description);
};
