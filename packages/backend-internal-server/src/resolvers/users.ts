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

  @AuthoriseUser()
  @Mutation(() => Boolean)
  async updateUserProfile(
    @Arg("profile") profile: UserProfileInput,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.usersService.updateProfile(user.id, profile);
  }

  @AuthoriseUser()
  @Mutation(() => Boolean)
  async subscribe(
    @Arg("community") community: RemoteReferenceInput,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.usersService.subscribe(user.id, await translateHost(community.host), community.id);
  }

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

  @AuthoriseUser()
  @Query(() => [RemoteReference])
  async getSubscriptions(@CurrentUser() user: User): Promise<RemoteReference[]> {
    return await this.usersService.getSubscriptions(user.id);
  }

  @FieldResolver(() => UserProfile)
  profile(@Root() user: User): UserProfile {
    return user.profile;
  }

  @AuthoriseUser()
  @Query(() => [Post])
  async getAllPosts(@CurrentUser() user: User, @Arg("username") username: string): Promise<Post[]> {
    const postsReferences = await this.usersService.getAllPosts(username);
    const postsAndComments = await Promise.all(
      postsReferences.map(async (postReference) => {
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
