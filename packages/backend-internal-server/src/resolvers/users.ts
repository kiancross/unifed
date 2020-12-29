/*
 * CS3099 Group A3
 */

import { Resolver, Mutation, FieldResolver, ResolverInterface, Root, Arg } from "type-graphql";
import { CurrentUser } from "./helpers";
import { AuthoriseUser } from "../auth-checkers";
import { User, UserModel } from "unifed-backend-core";
import { UserProfileInput } from "./inputs";

@Resolver(User)
export class UsersResolver implements ResolverInterface<User> {
  @AuthoriseUser()
  @Mutation(() => Boolean)
  async updateUserProfile(
    @Arg("profile") profile: UserProfileInput,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    await UserModel.updateOne({ _id: user.id }, { $set: { profile } });
    return true;
  }

  @FieldResolver()
  profile(@Root() user: User) {
    return user.profile;
  }
}
