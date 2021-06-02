/*
 * Copyright (C) 2020 Kian Cross
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

export { HTTPError } from "got";

/**
 * Error thrown if the remote server returns an
 * error.
 *
 * @internal
 */
export class RemoteResponseError<T> extends Error {
  /**
   * @param value  Response received from remote server.
   */
  constructor(value: T) {
    super(`Invalid response: ${value}`);
  }
}

/**
 * Predicate to check if a given value is an array of
 * strings.
 *
 * @param values  Values to check.
 *
 * @returns A predicate indicating if the given values are an
 *          array of strings.
 *
 * @internal
 */
export function isStringArray(values: unknown): values is string[] {
  if (!Array.isArray(values)) {
    return false;
  }

  for (const value of values) {
    if (typeof value !== "string") {
      return false;
    }
  }

  return true;
}
