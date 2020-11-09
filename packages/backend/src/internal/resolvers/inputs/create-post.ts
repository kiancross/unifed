/*
 * CS3099 Group A3
 */

import { InputType, Field } from "type-graphql";
import { RemoteReferenceInput } from "./remote-reference";

@InputType()
export class CreatePostInput {
  @Field(() => RemoteReferenceInput)
  community!: RemoteReferenceInput;

  @Field()
  title!: string;

  @Field()
  body!: string;
}
