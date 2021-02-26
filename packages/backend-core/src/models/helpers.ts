/*
 * CS3099 Group Project
 */

import { Ref, isRefType, isDocument } from "@typegoose/typegoose";
import { Base, EntityID } from "./base";

export function dateToUnixTimestamp(date?: Date): number {
  return Math.floor((date || new Date(0)).getTime() / 1000);
}

export function getIdFromRef<T extends Base>(item: Ref<T> | null): EntityID | null {
  if (isDocument(item)) {
    return item.id;
  } else if (isRefType(item)) {
    return item;
  } else {
    return null;
  }
}
