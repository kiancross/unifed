/*
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2021 Lewis Mazzei
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
