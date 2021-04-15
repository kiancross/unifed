/*
 * CS3099 Group A3
 */

import { InputType, Field } from "type-graphql";

/**
 * Input type for a reference in the federated network.
 * 
 * @internal
 */
@InputType()
export class RemoteReferenceInput {
  /**
   * ID
   */
  @Field()
  id!: string;

  /**
   * Host server
   */
  @Field()
  host!: string;
}
