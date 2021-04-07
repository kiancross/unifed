/*
 * CS3099 Group A3
 */

import zxcvbn, { ZXCVBNScore } from "zxcvbn";

/**
 * Contains the results of a password validation.
 */
export interface PasswordValidationResult {
  /**
   * Indicates if the password is valid or not.
   */
  valid: boolean;

  /**
   * A score indicating the strength of the password.
   *
   *  - `0` - too guessable - risky password - (guesses < 10^3).
   *
   *  - `1` - very guessable - protection from throttled online
   *    attacks - (guesses < 10^6).
   *
   *  - `2` - somewhat guessable - protection from unthrottled
   *    online attacks - (guesses < 10^8).
   *
   *  - `3` - safely unguessable - moderate protection from
   *    offline slow-hash scenario - (guesses < 10^10).
   *
   *  - `4` - very unguessable - strong protection from offline
   *    slow-hash scenario - (guesses >= 10^10).
   *
   *  [*Source*](https://github.com/dropbox/zxcvbn#usage)
   */
  score: ZXCVBNScore;

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
    score: result.score,
    warning: valid ? undefined : result.feedback.warning,
    suggestions: result.feedback.suggestions,
  };
};
