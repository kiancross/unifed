/*
 * CS3099 Group A3
 */

import { Service } from "typedi";

import {
  Resolver,
  Mutation,
  FieldResolver,
  ResolverInterface,
  Root,
  Arg,
  Query,
} from "type-graphql";

import { Post, RemoteReference, User, UserProfile } from "@unifed/backend-core";
import { CurrentUser, translateHost } from "./helpers";
import { AuthoriseUser } from "../auth-checkers";
import { RemoteReferenceInput, UserProfileInput } from "./inputs";
import { PostsService, UsersService } from "../services";

@Service()
@Resolver(User)
export class UsersResolver implements ResolverInterface<User> {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  /**
   * Allows user to update their profile.
   * 
   * @param profile The new profile to update to.
   * 
   * @param user The currently logged in user.
   * 
   * @returns True once profile has been updated.
   * 
   * @internal
   */
  @AuthoriseUser()
  @Mutation(() => Boolean)
  async updateUserProfile(
    @Arg("profile") profile: UserProfileInput,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.usersService.updateProfile(user.id, profile.name);
  }

  /**
   * Allows users to subscribe to a community.
   * 
   * @param community Reference to the community.
   * 
   * @param user Currently logged in user.
   * 
   * @returns True on success.
   * 
   * @internal
   */
  @AuthoriseUser()
  @Mutation(() => Boolean)
  async subscribe(
    @Arg("community") community: RemoteReferenceInput,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.usersService.subscribe(user.id, await translateHost(community.host), community.id);
  }

  /**
   * Allows users to unsubscribe from a community.
   * 
   * @param community Reference to the community.
   * 
   * @param user Currently logged in user.
   * 
   * @returns True on success.
   * 
   * @internal
   */
  @AuthoriseUser()
  @Mutation(() => Boolean)
  async unsubscribe(
    @Arg("community") community: RemoteReferenceInput,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.usersService.unsubscribe(
      user.id,
      await translateHost(community.host),
      community.id,
    );
  }

  /**
   * Fetches all the communities the user is subscribed to.
   * 
   * @param user Currently logged in user.
   * 
   * @returns Array of references to the communities on the federated network.
   * 
   * @internal
   */
  @AuthoriseUser()
  @Query(() => [RemoteReference])
  async getSubscriptions(@CurrentUser() user: User): Promise<RemoteReference[]> {
    return await this.usersService.getSubscriptions(user.id);
  }

  @FieldResolver(() => UserProfile)
  profile(@Root() user: User): UserProfile {
    return user.profile;
  }

  /**
   * Fetches all the posts a user has posted.
   * 
   * @param user Currently logged in user.
   * 
   * @param username Username of the user to get posts of.
   * 
   * @returns The posts made by the specified user.
   * 
   * @internal
   */
  @AuthoriseUser()
  @Query(() => [Post])
  async getAllPosts(@CurrentUser() user: User, @Arg("username") username: string): Promise<Post[]> {
    const postsReferences = await this.usersService.getAllPosts(username);
    const postsAndComments = await Promise.all(
      postsReferences.reverse().map(async (postReference) => {
        return this.postsService.getById(
          user.username,
          await translateHost(postReference.host),
          postReference.id,
        );
      }),
    );

    return postsAndComments.filter((postOrComment) => !!postOrComment.title);
  }
}
