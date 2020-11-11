/*
 * CS3099 Group A3
 */

import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { validate as uuidValidate } from "uuid";
import { ObjectType, Field, createUnionType } from "type-graphql";
import { dateToUnixTimeStamp } from "../utils/date";
import { Base, getIdFromRef } from "./base";
import { Community } from "./community";
import { RemoteReference } from "./remote-reference";

const PostParentUnion = createUnionType({
  name: "PostParent",
  types: () => [Post, Community] as const
});

@ObjectType()
export class Post extends Base {
  @Property({ ref: "Community", type: String })
  community?: Ref<Community>;

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

  @Field(() => PostParentUnion)
  get parent(): Ref<typeof PostParentUnion> {
    return this.parentPost ? this.parentPost : this.community;
  }

  set parent(parent: Ref<typeof PostParentUnion>) {

    if (parent instanceof Community) {
      this.community = parent;
      this.parentPost = undefined;

    } else if (parent instanceof Post) {
      this.community = parent.community;
      this.parentPost = parent;

    } else if (parent !== undefined && uuidValidate(parent)) {
    
      this.community = undefined; // TODO
      this.parentPost = parent;    

    } else {
      this.community = parent;
      this.parentPost = undefined;
    }
  }

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
      parent: getIdFromRef(this.parent),
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
