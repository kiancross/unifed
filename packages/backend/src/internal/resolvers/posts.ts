/*
 * CS3099 Group A3
 */

import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { CurrentUser } from "./utils";
import { AuthoriseUser } from "../auth-checkers";
import { Post, User } from "../../models";
import { CreatePostInput, RemoteReferenceInput } from "./inputs";
import { postsService } from "../../services";

@Resolver(Post)
export class PostsResolver /*implements ResolverInterface<Post> */ {
  @AuthoriseUser()
  @Mutation(() => Post)
  async createPost(
    @Arg("post") post: CreatePostInput,
    @CurrentUser() user: User,
  ): Promise<Post | null> {
    const p = await postsService.createPost(post.community.host, {
      ...post,
      parent: post.community.id,
      contentType: "markdown",
      author: {
        id: user.username,
        host: "localhost:8080",
      },
    });

    return p;
  }

  @Query(() => [Post])
  async getPosts(@Arg("community") remote: RemoteReferenceInput): Promise<Post[]> {
    const p = await postsService.getPosts(remote.host, remote.id);

    return p;
  }
}
