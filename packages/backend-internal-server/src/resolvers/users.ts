/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { Resolver, Mutation, FieldResolver, ResolverInterface, Root, Arg, Query } from "type-graphql";
import { CurrentUser, translateHost } from "./helpers";
import { AuthoriseUser } from "../auth-checkers";
import { RemoteReference, User } from "@unifed/backend-core";
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
    return this.usersService.unsubscribe(user.id, await translateHost(community.host), community.id);
  }

  @AuthoriseUser()
  @Query(() => [RemoteReference])
  async getSubscriptions(@CurrentUser() user: User): Promise<RemoteReference[]> {
    return this.usersService.getSubscriptions(user.id);
  }

  @FieldResolver()
  profile(@Root() user: User) {
    return user.profile;
  }
}
