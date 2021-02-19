/*
 * CS3099 Group A3
 */

import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class CommunityCall {
  @Field()
  type!: "request" | "offer" | "answer" | "ice";

  @Field({ nullable: true })
  sdp?: string;

  @Field({ nullable: true })
  from?: string;

  @Field({ nullable: true })
  to?: string;

  @Field({ nullable: true })
  community?: string;
}
