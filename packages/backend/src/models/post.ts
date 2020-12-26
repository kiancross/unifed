/*
 * CS3099 Group A3
 */

import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { dateToUnixTimestamp } from "../helpers/date";
import { Base, getIdFromRef } from "./base";
import { Community } from "./community";
import { RemoteReference } from "./remote-reference";

@ObjectType()
export class Post extends Base {
  @Property({ ref: "Community", type: String })
  community!: Ref<Community>;

  @Property({ ref: "Post", type: String })
  parentPost?: Ref<Post>;

  @Field()
  @Property({})
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

  get updatedAtUnixTimestamp() {
    return this.updatedAt ? dateToUnixTimestamp(this.updatedAt) : undefined;
  }

  get createdAtUnixTimestamp() {
    return this.createdAt ? dateToUnixTimestamp(this.createdAt) : undefined;
  }

  toJSON(): { [key: string]: any } {
    return {
      ...super.toJSON(),
      parent: getIdFromRef(this.parentPost === undefined ? this.community : this.parentPost),
      children: (this.children || []).map(getIdFromRef),
      title: this.title,
      contentType: this.contentType,
      body: this.body,
      author: this.author,
      modified: this.updatedAtUnixTimestamp,
      created: this.createdAtUnixTimestamp,
    };
  }
}

export const PostModel = getModelForClass(Post);
