/*
 * CS3099 Group A3
 */

/**
 * Validates that the given username/ID meets the
 * validation requirements:
 *
 *  - At least 1 character.
 *  - No more than 24 characters.
 *  - Only contains alphanumeric characters, dashes
 *    and underscores.
 *
 * This function is used for usernames/IDs belonging
 * to both users and communities.
 *
 * @param username  A username/ID to validate.
 */
export const validateUsername = (username: string): boolean => {
  return /^[a-zA-Z0-9-_]{1,24}$/.test(username);
};
