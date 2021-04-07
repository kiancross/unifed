/*
 * CS3099 Group A3
 */

import { ValidationError } from "class-validator";

/**
 * Converts an array of validation errors (produced by the
 * `class-validator` package) to a string representation.
 *
 * @param errors  The validation errors.
 *
 * @returns A string representation of the errors, or
 *          undefined if there were no errors.
 */
export function getValidationMessage(errors: ValidationError[]): string | undefined {
  if (errors.length === 0) {
    return undefined;
  }

  return errors
    .map((error) => error.constraints)
    .filter((constraint): constraint is NonNullable<ValidationError["constraints"]> => !!constraint)
    .map((constraint) => Object.values(constraint))
    .reduce((previous, current) => [...previous, ...current])
    .join("\n");
}
