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

import { ValidateNested, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { prop as Property } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";

import { JSONMap } from "../types";
import { Base } from "./base";

/**
 * Entity representing a user's profile.
 *
 * @internal
 */
@ObjectType()
export class UserProfile {
  @Field()
  @Property()
  name!: string;

  toJSON(): JSONMap {
    return {
      name: this.name,
    };
  }
}

/**
 * Entity representing the public fields of a
 * user.
 */
export class PublicUser extends Base {
  /**
   * The user's username.
   */
  @IsNotEmpty()
  @Field()
  @Property({ required: true })
  username!: string;

  /**
   * The user's profile.
   */
  @ValidateNested()
  @Field()
  @Type(() => UserProfile)
  @Property({ type: UserProfile, required: true })
  profile!: UserProfile;

  /**
   * Returns a JSON representation of the entity
   * in the format expected by the federation
   * protocol.
   */
  toJSON(): JSONMap {
    return {
      ...super.toJSON(),
      ...this.profile.toJSON(),
      username: this.username,
    };
  }
}
