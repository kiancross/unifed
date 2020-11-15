/*
 * CS3099 Group A3
 */

import zxcvbn from "zxcvbn";

export interface PasswordValidationResult {
  valid: boolean;
  warning?: string;
  suggestions: string[];
}

export function validatePassword(password: string): PasswordValidationResult {
  const result = zxcvbn(password);
  const valid = result.score >= 3;

  return {
    valid,
    warning: valid ? undefined : result.feedback.warning,
    suggestions: result.feedback.suggestions,
  };
}
