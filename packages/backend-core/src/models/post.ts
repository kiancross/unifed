/*
 * CS3099 Group A3
 */

import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { dateToUnixTimestamp } from "./helpers";
import { Base } from "./base";
import { getIdFromRef } from "./helpers";
import { Community } from "./community";
import { RemoteReference } from "./remote-reference";
import { JSONMap } from "../types";

@ObjectType()
export class Post extends Base {
  @Field(() => Community)
  @Property({ ref: "Community", type: String })
  community!: Ref<Community>;

  @Field(() => Post, { nullable: true })
  @Property({ ref: "Post", type: String })
  parentPost?: Ref<Post>;

  @Field({ nullable: true })
  @Property()
  title!: string;

  @Field()
  @Property({ required: true })
  contentType!: string;

  @Field()
  @Property({ required: true })
  body!: string;

  @Field()
  @Property({ _id: false, required: true })
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

  get updatedAtUnixTimestamp(): number {
    return this.updatedAt ? dateToUnixTimestamp(this.updatedAt) : 0;
  }

  get createdAtUnixTimestamp(): number {
    return this.createdAt ? dateToUnixTimestamp(this.createdAt) : 0;
  }

  toJSON(): JSONMap {
    const title = this.approved ? this.title : "Pending Approval";
    const body = this.approved ? this.body : "This post is pending approval.";

    return {
      ...super.toJSON(),
      parentPost: getIdFromRef(this.parentPost),
      community: getIdFromRef(this.community),
      children: (this.children || []).map(getIdFromRef),
      title,
      body,
      contentType: this.contentType,
      author: this.author,
      modified: this.updatedAtUnixTimestamp,
      created: this.createdAtUnixTimestamp,
      approved: this.approved,
    };
  }
}

export const PostModel = getModelForClass(Post);
