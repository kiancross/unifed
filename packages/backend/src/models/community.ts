/*
 * CS3099 Group A3
 */

import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { Base } from "./base";
import { Post } from "./post";

@ObjectType()
export class Community extends Base {
  @Field()
  @Property({ required: true })
  title!: string;

  @Field()
  @Property({ required: true })
  description!: string;

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
      admins: [],
    };
  }
}

export const CommunityModel = getModelForClass(Community);
