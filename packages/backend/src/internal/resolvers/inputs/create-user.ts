/*
 * CS3099 Group A3
 */

import { InputType, Field } from "type-graphql";
import { UserProfileInput } from "./user-profile";

@InputType()
export class CreateUserInput {
  @Field(() => UserProfileInput)
  profile!: UserProfileInput;
}
