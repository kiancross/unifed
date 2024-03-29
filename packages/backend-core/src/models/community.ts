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

import { IsArray, IsString, IsNotEmpty, ValidateNested, MaxLength } from "class-validator";
import { Type } from "class-transformer";
import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";

import { JSONMap } from "../types";
import { Base } from "./base";
import { Post } from "./post";
import { RemoteReference } from "./remote-reference";

/**
 * Entity representing a community.
 */
@ObjectType()
export class Community extends Base {
  /**
   * Title of the community.
   */
  @MaxLength(64, {
    message: "Title is too long",
  })
  @IsNotEmpty({
    message: "Title must not be empty",
  })
  @IsString()
  @Field()
  @Property({ required: true })
  title!: string;

  /**
   * Description of the community.
   */
  @MaxLength(10 * 1024, {
    message: "Description is too long",
  })
  @IsNotEmpty({
    message: "Description must not be empty",
  })
  @IsString()
  @Field()
  @Property({ required: true })
  description!: string;

  /**
   * Posts belonging to the community.
   */
  @ValidateNested()
  @Field(() => [Post])
  @Property({
    ref: "Post",
    foreignField: "community",
    localField: "_id",
  })
  posts!: Ref<Post>[];

  /**
   * Administrators of the community.
   */
  @IsArray()
  @ValidateNested()
  @Field(() => [RemoteReference])
  @Type(() => RemoteReference)
  @Property({ type: RemoteReference })
  admins!: RemoteReference[];

  /**
   * Returns a JSON representation of the entity
   * in the format expected by the federation
   * protocol.
   */
  toJSON(): JSONMap {
    return {
      ...super.toJSON(),
      title: this.title,
      description: this.description,
      admins: this.admins || [],
    };
  }
}

/**
 * Community model used for manipulating the MongoDB
 * database.
 */
export const CommunityModel = getModelForClass(Community);
