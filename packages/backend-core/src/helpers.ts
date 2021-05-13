/*
 * Copyright (C) 2021 Kian Cross
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
