/*
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2021 Allan Mathew Chacko
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
import { Post, User, Community, RemoteReference, config } from "@unifed/backend-core";
import { CreatePostInput, RemoteReferenceInput } from "./inputs";
import { translateHost } from "./helpers";
import { PostsService, CommunitiesService, UsersService } from "../services";

@Service()
@Resolver(Post)
export class PostsResolver implements ResolverInterface<Post> {
  constructor(
    private readonly postsService: PostsService,
    private readonly communitiesService: CommunitiesService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Allows a user to create a new post.
   *
   * @param post The new post to make.
   *
   * @param user Currently logged in user.
   *
   * @returns The newly created post.
   *
   * @internal
   */
  @AuthoriseUser()
  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg("post") post: CreatePostInput,
    @CurrentUser() user: User,
  ): Promise<Post | null> {
    return await this.postsService.create(user.username, await translateHost(post.community.host), {
      community: post.community.id,
      title: post.title,
      body: post.body,
      parentPost: post.parentPost,
    });
  }

  /**
   * Allows the author of a post or an admin of the community the post was made on to delete
   * the post.
   *
   * @param post Reference to the post on the federated network.
   *
   * @param user Currently logged in user.
   *
   * @returns True once the call is made.
   *
   * @internal
   */
  @AuthoriseUser()
  @Mutation(() => Boolean)
  async deletePost(
    @Arg("post") post: RemoteReferenceInput,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    await this.postsService.delete(user.username, await translateHost(post.host), post.id);
    return true;
  }

  /**
   * Allows the author of a post or an admin of the community the post was made on to update
   * the content of the post.
   *
   * @param post Reference to the post in the federated network.
   *
   * @param body The new body of the post.
   *
   * @param user Currently logged in user.
   *
   * @param title The new title of the post.
   *
   * @returns The updated post.
   *
   * @internal
   */
  @AuthoriseUser()
  @Mutation(() => Post)
  async updatePost(
    @Arg("post") post: RemoteReferenceInput,
    @Arg("body") body: string,
    @CurrentUser() user: User,
    @Arg("title", { nullable: true }) title?: string,
  ): Promise<Post> {
    return await this.postsService.update(user.username, await translateHost(post.host), {
      id: post.id,
      body,
      title: title || null,
    });
  }

  /**
   * Allows a user to report a post and set its approved flag to false.
   *
   * @param post The post to report
   *
   * @returns True on report success.
   *
   * @internal
   */
  @AuthoriseUser()
  @Mutation(() => Boolean)
  async reportPost(@Arg("post") post: RemoteReferenceInput): Promise<boolean> {
    if (post.host === config.internalReference || post.host === config.federationHost) {
      return await this.postsService.report(post.id);
    }
    return false;
  }

  /**
   * Fetches the list of posts from communities the user is subscribed to.
   *
   * @param user The currently logged in user.
   *
   * @returns Array of posts.
   *
   * @internal
   */
  @AuthoriseUser()
  @Query(() => [Post])
  async getSubscribedPosts(@CurrentUser() user: User): Promise<Post[]> {
    const subscriptions: RemoteReference[] = await this.usersService.getSubscriptions(user.id);
    const posts = await Promise.all(
      subscriptions.map((ref) => {
        return this.postsService.getByCommunity(user.username, ref.host, ref.id);
      }),
    );
    return posts.flat();
  }

  /**
   * Allows administrators to set the approved flag on the provided posts to true.
   *
   * @param user The admin making the approval.
   *
   * @param posts Array of post references to approve.
   *
   * @returns Returns true once the provided posts are approved.
   *
   * @internal
   */
  @AuthoriseUser()
  @Mutation(() => Boolean)
  async approvePosts(
    @CurrentUser() user: User,
    @Arg("posts", () => [RemoteReferenceInput]) posts: RemoteReferenceInput[],
  ): Promise<boolean> {
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      if (post.host === config.internalReference || post.host === config.federationHost) {
        await this.postsService.approve(user.username, post.id);
      }
    }
    return true;
  }

  /**
   * Allows administrators to delete an array of posts.
   *
   * @param user The admin deleting the posts.
   *
   * @param posts Array of post references to delete.
   *
   * @returns Returns true once the provided posts are deleted.
   *
   * @internal
   */
  @AuthoriseUser()
  @Mutation(() => Boolean)
  async deletePosts(
    @CurrentUser() user: User,
    @Arg("posts", () => [RemoteReferenceInput]) posts: RemoteReferenceInput[],
  ): Promise<boolean> {
    for (let i = 0; i < posts.length; i++) {
      await this.postsService.adminDelete(user.username, posts[i].id);
    }
    return true;
  }

  /**
   * Fetches an array of unapproved posts from communities the user moderates (is an admin in).
   *
   * @param user A community administrator.
   *
   * @returns Array of of unapproved posts.
   *
   * @internal
   */
  @AuthoriseUser()
  @Query(() => [Post])
  async getUnapprovedPosts(@CurrentUser() user: User): Promise<Post[]> {
    const allCommunities: Community[] = await this.communitiesService.getAll(
      await translateHost(config.internalReference),
    );
    // all communities from instance where user is an admin
    const adminCommunities: Community[] = allCommunities.filter((com) =>
      com.admins.find((admin) => admin._id === user.username),
    );
    const posts = await Promise.all(
      adminCommunities.map((com) => this.postsService.getUnfilteredPosts(com.id)),
    );
    const unapprovedPosts = posts.flat().filter((post) => !post.approved);
    return unapprovedPosts;
  }

  /**
   * Fetches all the posts from a community.
   *
   * @param community Community to fetch posts from.
   *
   * @param user The currently logged in user.
   *
   * @returns Array of posts.
   *
   * @internal
   */
  @Query(() => [Post])
  async getPosts(
    @Arg("community") community: RemoteReferenceInput,
    @CurrentUser() user: User,
  ): Promise<Post[]> {
    return await this.postsService.getByCommunity(
      user.username,
      await translateHost(community.host),
      community.id,
    );
  }

  /**
   * Fetches a post from the federated network.
   *
   * @param post Post to fetch.
   *
   * @param user The currently logged in user.
   *
   * @returns Object representing the post.
   *
   * @internal
   */
  @Query(() => Post)
  async getPost(@Arg("post") post: RemoteReferenceInput, @CurrentUser() user: User): Promise<Post> {
    return await this.postsService.getById(user.username, await translateHost(post.host), post.id);
  }

  @FieldResolver()
  async children(@Root() post: Post, @CurrentUser() user: User): Promise<Post[]> {
    if (post.host === undefined) {
      throw new Error("Host can not be undefined");
    }

    const posts = [];

    if (post.children) {
      for (const id of post.children) {
        let childPost;
        if (typeof id === "string") {
          childPost = await this.postsService.getById(
            user.username,
            await translateHost(post.host),
            id,
          );
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
  async parentPost(@Root() post: Post, @CurrentUser() user: User): Promise<Post | undefined> {
    if (post.host === undefined) {
      throw new Error("Host can not be undefined");
    }

    if (!post.parentPost) {
      return undefined;
    }

    const parent = await this.postsService.getById(
      user.username,
      post.host,
      post.parentPost as string,
    );

    if (parent === null) {
      throw new Error();
    }

    return parent;
  }
}
