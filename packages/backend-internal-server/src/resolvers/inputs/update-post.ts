/*
 * CS3099 Group A3
 */

import { InputType, Field } from "type-graphql";

@InputType()
export class UpdatePostInput {
  @Field()
  title!: string;

  @Field()
  body!: string;
}
