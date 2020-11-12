/*
 * CS3099 Group A3
 */

import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { ObjectType, Field, createUnionType } from "type-graphql";
import { dateToUnixTimeStamp } from "../utils/date";
import { Base, getIdFromRef } from "./base";
import { Community, CommunityModel } from "./community";
import { RemoteReference } from "./remote-reference";

const PostParentUnion = createUnionType({
  name: "PostParent",
  types: () => [Post, Community] as const,
});

type PostObjectFields =
  | "community"
  | "parentPost"
  | "title"
  | "contentType"
  | "body"
  | "author"
  | "parent";
export type PostObject = Pick<Post, PostObjectFields>;

@ObjectType()
export class Post extends Base {
  @Field(() => Community)
  @Property({ ref: "Community", type: String })
  community!: Ref<Community>;

  @Field(() => Post, { nullable: true })
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

  get parent(): Ref<typeof PostParentUnion> {
    return this.parentPost === undefined ? this.community : this.parentPost;
  }

  static async fromObj(obj: PostObject): Promise<Post> {
    const post = new Post();

    if (obj.parent && (obj.parentPost || obj.community)) {
      new Error("Must not set 'parentPost' or 'community' if 'parent' is set");
    }

    post.title = obj.title;
    post.contentType = obj.contentType;
    post.body = obj.body;
    post.author = obj.author;
    post.parentPost = obj.parentPost;
    post.community = obj.community;

    if (obj.parentPost && !(await PostModel.findById(obj.parentPost)))
      new Error("'parentPost' not found");
    if (obj.community && !(await CommunityModel.findById(obj.community)))
      new Error("'community' not found");

    if (obj.parent) {
      const parentPost = await PostModel.findById(obj.parent);

      if (parentPost) {
        post.community = parentPost.community;
        post.parentPost = parentPost;
      } else {
        const community = await CommunityModel.findById(obj.parent);

        if (community) {
          post.community = community;
        } else {
          throw Error("'parent' is not a community or post");
        }
      }
    }

    return post;
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
