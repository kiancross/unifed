/*
 * CS3099 Group A3
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
