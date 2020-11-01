/*
 * CS3099 Group A3
 */

import { InputType, Field } from "type-graphql";

@InputType()
export default class UserProfileInput {
  @Field()
  name!: string;
}
