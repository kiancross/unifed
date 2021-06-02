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
