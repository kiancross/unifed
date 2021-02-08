/*
 * CS3099 Group A3
 */

import { IsArray, IsString, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { Base } from "./base";
import { Post } from "./post";
import { RemoteReference } from "./remote-reference";

@ObjectType()
export class Community extends Base {
  @IsNotEmpty()
  @IsString()
  @Field()
  @Property({ required: true })
  title!: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  @Property({ required: true })
  description!: string;

  @ValidateNested()
  @Field(() => [Post])
  @Property({
    ref: "Post",
    type: String,
    foreignField: "community",
    localField: "_id",
  })
  posts?: Ref<Post>[];

  @IsArray()
  @ValidateNested()
  @Type(() => RemoteReference)
  @Property({ _id: false, required: true })
  admins?: RemoteReference[];

  toJSON(): { [key: string]: any } {
    return {
      ...super.toJSON(),
      title: this.title,
      description: this.description,
      admins: this.admins || [],
    };
  }
}

export const CommunityModel = getModelForClass(Community);
