/*
 * CS3099 Group A3
 */

import validator from "validator";

/**
 * Validates that the given string is a valid
 * email address.
 *
 * @param email An email address to validate.
 */
export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email);
};
