/*
 * CS3099 Group A3
 */

import { InputType, Field } from "type-graphql";
import { RemoteReferenceInput } from "./remote-reference";
import { UpdatePostInput } from "./update-post";

@InputType()
export class CreatePostInput extends UpdatePostInput {
  @Field(() => RemoteReferenceInput)
  parent!: RemoteReferenceInput;
}
