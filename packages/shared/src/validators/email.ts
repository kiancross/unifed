/*
 * CS3099 Group A3
 */

import validator from "validator";

export function validateEmail(email: string): boolean {
  return validator.isEmail(email);
}
