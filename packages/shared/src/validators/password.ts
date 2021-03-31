/*
 * CS3099 Group A3
 */

import zxcvbn from "zxcvbn";

/**
 * Contains the results of a password validation.
 */
export interface PasswordValidationResult {
  /**
   * Indicates if the password is valid or not.
   */
  valid: boolean;

  /**
   * A warning (if any) about the password.
   */
  warning?: string;

  /**
   * Suggestions (if any) to improve the password.
   */
  suggestions: string[];
}

/**
 * Validates that the given password meets the
 * strength requirements.
 *
 * This check does not use any hard coded rules,
 * but rather uses a heuristic to measure how good
 * a password is.
 *
 * @param password  A password to validate.
 */
export const validatePassword = (password: string): PasswordValidationResult => {
  const result = zxcvbn(password);
  const valid = result.score >= 3;

  return {
    valid,
    warning: valid ? undefined : result.feedback.warning,
    suggestions: result.feedback.suggestions,
  };
};
