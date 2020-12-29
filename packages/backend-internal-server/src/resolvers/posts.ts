/*
 * CS3099 Group A3
 */

import {
  Query,
  Resolver,
  FieldResolver,
  Mutation,
  ResolverInterface,
  Root,
  Arg,
} from "type-graphql";
import { CurrentUser } from "./helpers";
import { AuthoriseUser } from "../auth-checkers";
import { Post, User } from "unifed-backend-core";
import { CreatePostInput, RemoteReferenceInput } from "./inputs";
import { postsClient } from "unifed-backend-federation-client";

@Resolver(Post)
export class PostsResolver implements ResolverInterface<Post> {
  @AuthoriseUser()
  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg("post") post: CreatePostInput,
    @CurrentUser() user: User,
  ): Promise<Post | null> {
    return await postsClient.createPost(
      post.parent.host,
      user,
      post.parent.id,
      post.title,
      post.body,
    );
  }

  @Query(() => [Post])
  async getPosts(@Arg("community") community: RemoteReferenceInput): Promise<Post[]> {
    return await postsClient.getPosts(community.host, community.id);
  }

  @Query(() => Post)
  async getPost(@Arg("post") post: RemoteReferenceInput): Promise<Post> {
    return await postsClient.getPost(post.host, post.id);
  }

  @FieldResolver()
  async children(@Root() post: Post): Promise<Post[]> {
    if (post.host === undefined) {
      throw new Error("Host can not be undefined");
    }

    const posts = [];

    if (post.children) {
      for (const id of post.children) {
        let childPost;
        if (typeof id === "string") {
          childPost = await postsClient.getPost(post.host, id);
        } else if (id instanceof Post) {
          childPost = id;
        } else {
          throw new Error("Invalid child post type");
        }

        posts.push(childPost);
      }
    }

    return posts;
  }
}
