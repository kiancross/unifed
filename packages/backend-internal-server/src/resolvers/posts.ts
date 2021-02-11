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
import { Post, User, Community } from "@unifed/backend-core";
import { CreatePostInput, UpdatePostInput, RemoteReferenceInput } from "./inputs";
import { translateHost } from "./helpers";
import { PostsService, CommunitiesService } from "../services";

@Service()
@Resolver(Post)
export class PostsResolver implements ResolverInterface<Post> {
  constructor(
    private readonly postsService: PostsService,
    private readonly communitiesService: CommunitiesService,
  ) {}

  @AuthoriseUser()
  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg("post") post: CreatePostInput,
    @CurrentUser() user: User,
  ): Promise<Post | null> {
    return await this.postsService.create(
      await translateHost(post.community.host),
      user,
      post.community.id,
      post.title,
      post.body,
      post.parentPost,
    );
  }

  @AuthoriseUser()
  @Mutation(() => Boolean)
  async deletePost(@Arg("post") post: RemoteReferenceInput): Promise<boolean> {
    await this.postsService.delete(await translateHost(post.host), post.id);
    return true;
  }

  @AuthoriseUser()
  @Mutation(() => Boolean)
  async updatePost(
    @Arg("post") post: RemoteReferenceInput,
    @Arg("content") content: UpdatePostInput,
  ): Promise<boolean> {
    await this.postsService.update(
      await translateHost(post.host),
      post.id,
      content.title,
      content.body,
    );
    return true;
  }

  @Query(() => [Post])
  async getPosts(@Arg("community") community: RemoteReferenceInput): Promise<Post[]> {
    return await this.postsService.getByCommunity(
      await translateHost(community.host),
      community.id,
    );
  }

  @Query(() => Post)
  async getPost(@Arg("post") post: RemoteReferenceInput): Promise<Post> {
    return await this.postsService.getById(await translateHost(post.host), post.id);
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
          childPost = await this.postsService.getById(await translateHost(post.host), id);
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

  @FieldResolver()
  async community(@Root() post: Post): Promise<Community> {
    if (post.host === undefined) {
      throw new Error("Host can not be undefined");
    }

    const community = await this.communitiesService.getOne(post.host, post.community as string);

    if (community === null) {
      throw new Error();
    }

    return community;
  }

  @FieldResolver()
  async parentPost(@Root() post: Post): Promise<Post | undefined> {
    if (post.host === undefined) {
      throw new Error("Host can not be undefined");
    }

    if (!post.parentPost) {
      return undefined;
    }

    const parent = await this.postsService.getById(post.host, post.parentPost as string);

    if (parent === null) {
      throw new Error();
    }

    return parent;
  }
}
