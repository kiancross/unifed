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
import { Service } from "typedi";
import { CurrentUser } from "./helpers";
import { AuthoriseUser } from "../auth-checkers";
import { Post, User } from "@unifed/backend-core";
import { CreatePostInput, RemoteReferenceInput } from "./inputs";
import { PostsService } from "@unifed/backend-federation-client";

@Service()
@Resolver(Post)
export class PostsResolver implements ResolverInterface<Post> {
  constructor(private readonly postsService: PostsService) {}

  @AuthoriseUser()
  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg("post") post: CreatePostInput,
    @CurrentUser() user: User,
  ): Promise<Post | null> {
    return await this.postsService.create(
      post.parent.host,
      user,
      post.parent.id,
      post.title,
      post.body,
    );
  }

  @Query(() => [Post])
  async getPosts(@Arg("community") community: RemoteReferenceInput): Promise<Post[]> {
    return await this.postsService.getByCommunity(community.host, community.id);
  }

  @Query(() => Post)
  async getPost(@Arg("post") post: RemoteReferenceInput): Promise<Post> {
    return await this.postsService.getById(post.host, post.id);
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
          childPost = await this.postsService.getById(post.host, id);
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
