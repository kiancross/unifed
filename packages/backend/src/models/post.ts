/*
 * CS3099 Group A3
 */

import { prop as Property, getModelForClass, Ref, modelOptions } from "@typegoose/typegoose";
import { dateToUnixTimeStamp } from "../utils/date";
import { ObjectType, Field } from "type-graphql";
import { Base, getIdFromRef } from "./base";
import { Community } from "./community";
import { RemoteReference } from "./remote-reference";

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
@ObjectType()
export class Post extends Base {
  @Property({ ref: "Community", type: String })
  community!: Ref<Community>;

  @Property({ ref: "Post", type: String })
  parentPost?: Ref<Post>;

  @Field()
  parent!: string;

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

  get updatedAtUnixTimeStamp() {
    return this.updatedAt ? dateToUnixTimeStamp(this.updatedAt) : undefined;
  }

  get createdAtUnixTimeStamp() {
    return this.createdAt ? dateToUnixTimeStamp(this.createdAt) : undefined;
  }

  toJSON(): { [key: string]: any } {
    if (this.updatedAt === undefined || this.createdAt === undefined) {
      throw Error("Missing content meta-data");
    }

    return {
      ...super.toJSON(),
      parent: this.parentPost ? getIdFromRef(this.parentPost) : getIdFromRef(this.community),
      children: this.children?.map(getIdFromRef),
      title: this.title,
      contentType: this.contentType,
      body: this.body,
      author: this.author,
      modified: this.updatedAtUnixTimeStamp,
      created: this.createdAtUnixTimeStamp,
    };
  }
}

export const PostModel = getModelForClass(Post);
