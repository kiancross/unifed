/*
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2021 Allan Mathew Chacko
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

import { JSONMap } from "../types";
import { Base } from "./base";
import { getIdFromRef } from "./helpers";
import { Community } from "./community";
import { RemoteReference } from "./remote-reference";

/**
 * Entity representing a post.
 */
@ObjectType()
export class Post extends Base {
  /**
   * The [[`Community`]] that the post belongs
   * to.
   */
  @IsNotEmpty()
  @Field(() => Community)
  @Property({ ref: "Community", type: String })
  community!: Ref<Community>;

  /**
   * The parent of this post (only exists if this is
   * a comment).
   */
  @Field(() => Post, { nullable: true })
  @Property({ ref: "Post", type: String })
  parentPost?: Ref<Post> | null;

  /**
   * Title of the post.
   */
  @IsOptional()
  @MaxLength(128, {
    message: "Title is too long",
  })
  @Field(() => String, { nullable: true })
  @Property({ type: String })
  title!: string | null;

  /**
   * Content type of the post (either `text` or `markdown`).
   */
  @Matches(/^(text)|(markdown)$/, {
    message: "Only `text` and `markdown` content types are supported",
  })
  @Property({ required: true })
  contentType!: string;

  /**
   * Body of the post.
   */
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

  /**
   * Author of the post.
   */
  @IsNotEmpty()
  @ValidateNested()
  @Field()
  @Type(() => RemoteReference)
  @Property({ required: true })
  author!: RemoteReference;

  /**
   * Children of the post (i.e. comments).
   */
  @Field(() => [Post])
  @Property({
    ref: () => Post,
    type: String,
    foreignField: "parentPost",
    localField: "_id",
  })
  children?: Ref<Post>[];

  /**
   * Whether the post has been approved or not.
   */
  @Property({ required: true })
  @Field()
  approved!: boolean;

  /**
   * Returns a JSON representation of the entity
   * in the format expected by the federation
   * protocol.
   */
  toJSON(): JSONMap {
    // We want to hide the content of a post if it is not
    // approved.
    //
    // There is no concept of an 'approved' post within the
    // federated protocol, so we have to actually change the
    // content that is returned so that this works on all
    // implementations.
    const title = !this.approved && this.title ? "Pending Approval" : this.title;
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

      // See the federation specification for why this
      // convoluted format is apparently necessary.
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

/**
 * Post model used for manipulating the MongoDB
 * database.
 */
export const PostModel = getModelForClass(Post);
