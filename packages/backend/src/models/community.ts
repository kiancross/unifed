/*
 * CS3099 Group A3
 */

import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { Base } from "./base";
import { Post } from "./post";
import { User } from "./user";

@ObjectType()
export class Community extends Base {
  @Field()
  @Property({ required: true })
  title!: string;

  @Field()
  @Property({ required: true })
  description!: string;

  @Field(() => [User])
  @Property({ ref: "User" })
  admins?: Ref<User>[];

  @Field(() => [Post])
  @Property({
    ref: "Post",
    type: String,
    foreignField: "community",
    localField: "_id",
  })
  posts?: Ref<Post>[];

  toJSON() {
    return {
      ...super.toJSON(),
      title: this.title,
      description: this.description,
      admins: this.admins,
    };
  }
}

export const CommunityModel = getModelForClass(Community);
