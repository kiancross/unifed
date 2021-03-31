/*
 * CS3099 Group A3
 */

import {
  ValidateNested,
  Matches,
  MaxLength,
  IsString,
  IsNotEmpty,
  IsOptional,
} from "class-validator";

import { Type } from "class-transformer";
import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { Base } from "./base";
import { getIdFromRef } from "./helpers";
import { Community } from "./community";
import { RemoteReference } from "./remote-reference";
import { JSONMap } from "../types";

@ObjectType()
export class Post extends Base {
  @IsNotEmpty()
  @Field(() => Community)
  @Property({ ref: "Community", type: String })
  community!: Ref<Community>;

  @Field(() => Post, { nullable: true })
  @Property({ ref: "Post", type: String })
  parentPost?: Ref<Post> | null;

  @IsOptional()
  @MaxLength(128, {
    message: "Title is too long",
  })
  @Field(() => String, { nullable: true })
  @Property()
  title!: string | null;

  @Matches(/^(text)|(markdown)$/, {
    message: "Only `text` and `markdown` content types are supported",
  })
  @Property({ required: true })
  contentType!: string;

  @MaxLength(1024 * 1024 * 500, {
    message: "Body is too long",
  })
  @IsNotEmpty({
    message: "Body must be a non-empty string",
  })
  @IsString()
  @Field()
  @Property({ required: true })
  body!: string;

  @IsNotEmpty()
  @ValidateNested()
  @Field()
  @Type(() => RemoteReference)
  @Property({ required: true })
  author!: RemoteReference;

  @Field(() => [Post])
  @Property({
    ref: () => Post,
    type: String,
    foreignField: "parentPost",
    localField: "_id",
  })
  children?: Ref<Post>[];

  @Property({ required: true })
  @Field()
  approved!: boolean;

  toJSON(): JSONMap {
    const title = this.approved ? this.title : "Pending Approval";
    const body = this.approved ? this.body : "This post is pending approval.";

    return {
      ...super.toJSON(),
      parentPost: getIdFromRef(this.parentPost),
      community: getIdFromRef(this.community),
      children: (this.children || []).map(getIdFromRef),
      author: this.author.toJSON(),
      modified: this.modified,
      created: this.created,
      approved: this.approved,
      content: [
        {
          [this.contentType]: {
            [this.contentType]: body,
          },
        },
      ],
      title,
    };
  }
}

export const PostModel = getModelForClass(Post);
