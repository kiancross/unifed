/*
 * CS3099 Group Project
 */

import { Ref, isRefType, isDocument } from "@typegoose/typegoose";
import { Base, EntityID } from "./base";

/**
 * Converts a date to a UNIX timestamp.
 *
 * @param date  The date to convert.
 *
 * @returns The date as a UNIX timestamp (in seconds).
 *
 * @internal
 */
export function dateToUnixTimestamp(date?: Date): number {
  return Math.floor((date || new Date(0)).getTime() / 1000);
}

/**
 * Gets an ID from a reference object.
 *
 * References can either be documents (resolved) or
 * an ID to a document (unresolved). This function
 * always returns the ID, even in the resolved case.
 *
 * @param item  The reference to get the ID from.
 *
 * @returns The reference's ID.
 *
 * @internal
 */
export function getIdFromRef<T extends Base>(item: Ref<T> | null): EntityID | null {
  if (isDocument(item)) {
    return item.id;
  } else if (isRefType(item)) {
    return item;
  } else {
    return null;
  }
}
