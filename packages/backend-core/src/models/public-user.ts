/*
 * CS3099 Group A3
 */

import { ValidateNested, IsNotEmpty } from "class-validator";
import { prop as Property } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { JSONMap } from "../types";
import { Base } from "./base";

@ObjectType()
export class UserProfile {
  @Field()
  @Property({ required: true })
  name!: string;

  toJSON(): JSONMap {
    return {
      name: this.name,
    };
  }
}

export class PublicUser extends Base {
  @IsNotEmpty()
  @Field()
  @Property({ required: true })
  username!: string;

  @ValidateNested()
  @Field()
  @Property({ _id: false, ref: UserProfile, required: true })
  profile!: UserProfile;

  toJSON(): JSONMap {
    return {
      ...super.toJSON(),
      ...this.profile.toJSON(),
      username: this.username,
    };
  }
}
