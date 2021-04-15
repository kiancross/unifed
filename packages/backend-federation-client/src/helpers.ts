/*
 * CS3099 Group A3
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
