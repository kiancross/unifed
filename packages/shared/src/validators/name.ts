/*
 * CS3099 Group A3
 */

/**
 * Validates that the given name meets the
 * validation requirements:
 *
 *  - At least 1 character.
 *  - No more than 64 characters.
 *  - Any type of character.
 *
 * This function is used for names belonging
 * to both users and communities.
 *
 * @param name  A name to validate.
 */
export const validateName = (name: string): boolean => {
  return /^.{1,64}$/.test(name);
};
