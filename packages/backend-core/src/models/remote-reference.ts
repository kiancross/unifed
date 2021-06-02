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

import { prop as Property } from "@typegoose/typegoose";
import { ObjectType } from "type-graphql";
import { JSONMap } from "../types";
import { config } from "../config";
import { Base } from "./base";

/**
 * Entity representing another entity on a
 * remote instance.
 */
@ObjectType()
export class RemoteReference extends Base {
  /**
   * The ID of the entity.
   */
  @Property({ required: true })
  _id!: string;

  /**
   * The host that the entity belongs to.
   */
  @Property({ required: true })
  host!: string;

  /**
   * Returns a JSON representation of the entity
   * in the format expected by the federation
   * protocol.
   */
  toJSON(): JSONMap {
    if (!this.host) {
      throw new Error("`host` must be set");
    }

    return {
      id: this.id,

      // Transform the host if it is referring to the local
      // instance.
      host: this.host === config.internalReference ? config.siteHost : this.host,
    };
  }
}
