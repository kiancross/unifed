/*
 * CS3099 Group A3
 */

import { IsArray, IsString, IsNotEmpty, ValidateNested, MaxLength } from "class-validator";
import { Type } from "class-transformer";
import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { JSONMap } from "../types";
import { Base } from "./base";
import { Post } from "./post";
import { RemoteReference } from "./remote-reference";

@ObjectType()
export class Community extends Base {
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

  @ValidateNested()
  @Field(() => [Post])
  @Property({
    ref: "Post",
    foreignField: "community",
    localField: "_id",
  })
  posts?: Ref<Post>[];

  @IsArray()
  @ValidateNested()
  @Field(() => [RemoteReference])
  @Type(() => RemoteReference)
  @Property({
    _id: false,
    ref: RemoteReference,
  })
  admins?: RemoteReference[];

  toJSON(): JSONMap {
    return {
      ...super.toJSON(),
      title: this.title,
      description: this.description,
      admins: this.admins || [],
    };
  }
}

export const CommunityModel = getModelForClass(Community);
