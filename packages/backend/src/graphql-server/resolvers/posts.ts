/*
 * CS3099 Group A3
 */

import { Query, Resolver, FieldResolver, Mutation, ResolverInterface, Root, Arg } from "type-graphql";
import { CurrentUser } from "./utils";
import { AuthoriseUser } from "../auth-checkers";
import { Post, User } from "../../models";
import { CreatePostInput, RemoteReferenceInput } from "./inputs";
import { postsClient } from "../federation-client";

@Resolver(Post)
export class PostsResolver implements ResolverInterface<Post> {
  @AuthoriseUser()
  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg("post") post: CreatePostInput,
    @CurrentUser() user: User,
  ): Promise<Post | null> {
    return await postsClient.createPost(post.parent.host, user, post.parent.id, post.title, post.body);
  }

  @Query(() => [Post])
  async getPosts(@Arg("community") remote: RemoteReferenceInput): Promise<Post[]> {
    return await postsClient.getPosts(remote.host, remote.id);
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
