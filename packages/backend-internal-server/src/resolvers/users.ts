/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { Resolver, Mutation, FieldResolver, ResolverInterface, Root, Arg } from "type-graphql";
import { CurrentUser } from "./helpers";
import { AuthoriseUser } from "../auth-checkers";
import { User } from "@unifed/backend-core";
import { UserProfileInput } from "./inputs";
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

  @FieldResolver()
  profile(@Root() user: User) {
    return user.profile;
  }
}
