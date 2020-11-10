/*
 * CS3099 Group A3
 */

import { ObjectType, Field } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";

@ObjectType()
export class RemoteReference {
  @Field()
  @Property({ required: true })
  id!: string;

  @Field()
  @Property({ required: true })
  host!: string;
}
