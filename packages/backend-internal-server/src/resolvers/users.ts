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

import { RemoteReference, User, UserProfile } from "@unifed/backend-core";
import { CurrentUser, translateHost } from "./helpers";
import { AuthoriseUser } from "../auth-checkers";
import { RemoteReferenceInput, UserProfileInput } from "./inputs";
import { UsersService } from "../services";

@Service()
@Resolver(User)
export class UsersResolver implements ResolverInterface<User> {
  constructor(private readonly usersService: UsersService) {}

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
}
