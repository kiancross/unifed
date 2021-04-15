/*
 * CS3099 Group A3
 */

import { InputType, Field } from "type-graphql";

/**
 * User profile input used in API.
 * 
 * @internal
 */
@InputType()
export class UserProfileInput {
  /**
   * Name of the user.
   */
  @Field()
  name!: string;
}
