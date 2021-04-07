/*
 * CS3099 Group A3
 */

// Derived from
// https://github.com/microsoft/TypeScript/issues/1897#issuecomment-338650717

/**
 * Valid JSON types.
 */
export type AnyJSON = boolean | number | string | null | JSONArray | JSONMap | toJSON;

/**
 * Any object with a `toJSON` method.
 */
export interface toJSON {
  toJSON: () => JSONArray | JSONMap;
}

/**
 * A JSON array.
 */
export type JSONArray = Array<AnyJSON>;

/**
 * A JSON object.
 */
export interface JSONMap {
  [key: string]: AnyJSON;
}
