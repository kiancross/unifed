/*
 * CS3099 Group A3
 */

import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { CurrentUser } from "./utils";
import { AuthoriseUser } from "../auth-checkers";
import { Post, User } from "../../models";
import { CreatePostInput, RemoteReferenceInput } from "./inputs";
import { postsClient } from "../federation-client";

@Resolver(Post)
export class PostsResolver /*implements ResolverInterface<Post>*/ {

  @AuthoriseUser()
  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg("post") post: CreatePostInput,
    @CurrentUser() user: User,
  ): Promise<Post | null> {
    return await postsClient.createPost(post.parent.host, {
      ...post,
      parent: post.parent.id,
      contentType: "markdown",
      author: {
        id: user.username,
        host: "localhost:8080",
      },
    });
  }

  @Query(() => [Post])
  async getPosts(@Arg("community") remote: RemoteReferenceInput): Promise<Post[]> {
    return await postsClient.getPosts(remote.host, remote.id);
  }
}
