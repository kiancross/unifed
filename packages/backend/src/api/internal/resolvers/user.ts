/*
 * CS3099 Group A3
 */

import { Resolver, Query, Arg } from "type-graphql";
import { User, UserModel } from "../../../models";

import { CreateUserInput } from "./inputs";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getUsers(@Arg("user") user: CreateUserInput): Promise<User[]> {
    console.log(user);
    return await UserModel.find();
  }
}
