/*
 * CS3099 Group A3
 */

import { Resolver, Query, Arg } from "type-graphql";
import { User, UserModel } from "../../../models/user";

import CreateUserType from "./inputs/create-user";

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async getUsers(@Arg("user") user: CreateUserType): Promise<User[]> {
    console.log(user);
    return await UserModel.find();
  }
}
