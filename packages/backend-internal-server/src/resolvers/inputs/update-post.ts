/*
 * CS3099 Group A3
 */

import { InputType, Field } from "type-graphql";

/**
 * Input used when updating a post.
 * 
 * @internal
 */
@InputType()
export class UpdatePostInput {
  /**
   * Title of the post.
   * Null if post is a comment.
   */
  @Field({ nullable: true })
  title!: string;

  /**
   * Main content of the post.
   */
  @Field()
  body!: string;
}
