/*
 * CS3099 Group A3
 */

import { InputType, Field } from "type-graphql";
import { RemoteReferenceInput } from "./remote-reference";
import { UpdatePostInput } from "./update-post";

/**
 * Input used when creating a post.
 * 
 * @internal
 */
@InputType()
export class CreatePostInput extends UpdatePostInput {
  /**
   * Reference to the community on which the post is made.
   */
  @Field(() => RemoteReferenceInput)
  community!: RemoteReferenceInput;

  /**
   * The post a comment is attach to.
   * Null if the post is not a comment.
   */
  @Field({ nullable: true })
  parentPost!: string;
}
