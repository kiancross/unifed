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

import { prop as Property, defaultClasses } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { v4 as uuidv4 } from "uuid";

import { dateToUnixTimestamp } from "./helpers";
import { JSONMap } from "../types";

/**
 * Type representing the ID of an entity.
 */
export type EntityID = string;

/**
 * Base class for other entities to inherit from.
 *
 * Contains base properties that are needed across
 * most other models.
 */
@ObjectType()
export abstract class Base extends defaultClasses.TimeStamps {
  /**
   * The ID (primary key) of the entity.
   */
  @Property({ default: uuidv4, required: true })
  _id!: EntityID;

  /**
   * Host that the entity belongs to.
   *
   * Because this is a federated system, there are many
   * instances where entities are scoped to a specific
   * instance (rather than globally scoped).
   */
  @Field()
  host?: string;

  /**
   * Alias for the `_id` property.
   */
  @Field(() => ID)
  get id(): EntityID {
    return this._id;
  }

  set id(id: EntityID) {
    this._id = id;
  }

  /**
   * Access to `createdAt` as a UNIX timestamp.
   */
  get created(): number {
    return dateToUnixTimestamp(this.createdAt);
  }

  set created(created: number) {
    this.createdAt = new Date(created * 1000);
  }

  /**
   * Access to `updatedAt` as a UNIX timestamp.
   */
  get modified(): number {
    return dateToUnixTimestamp(this.updatedAt);
  }

  set modified(modified: number) {
    this.updatedAt = new Date(modified * 1000);
  }

  /**
   * Returns a JSON representation of the entity
   * in the format expected by the federation
   * protocol.
   */
  toJSON(): JSONMap {
    return {
      id: this.id,
    };
  }
}
