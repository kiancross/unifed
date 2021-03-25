/*
 * CS3099 Group A3
 */

import { ValidationError } from "class-validator";

export const getValidationMessage = (errors: ValidationError[]): string | undefined => {
  if (errors.length === 0) {
    return undefined;
  }

  return errors
    .map((error) => error.constraints)
    .filter((constraint): constraint is NonNullable<ValidationError["constraints"]> => !!constraint)
    .map((constraint) => Object.values(constraint))
    .reduce((previous, current) => [...previous, ...current])
    .join("\n");
};
