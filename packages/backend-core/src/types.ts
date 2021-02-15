/*
 * CS3099 Group A3
 */

// Derived from
// https://github.com/microsoft/TypeScript/issues/1897#issuecomment-338650717

type AnyJSON = boolean | number | string | null | JSONArray | JSONMap | toJSON;

interface toJSON {
  toJSON: () => JSONArray | JSONMap;
}

export type JSONArray = Array<AnyJSON>;

export interface JSONMap {
  [key: string]: AnyJSON;
}
