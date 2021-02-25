/*
 * CS3099 Group A3
 */

import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { PublicUser } from "./public-user";
import { RemoteReference } from "./remote-reference";

@ObjectType()
class EmailRecord {
  @Field({ nullable: true })
  @Property()
  address?: string;

  @Field({ nullable: true })
  @Property()
  verified?: boolean;
}

@ObjectType()
export class User extends PublicUser {
  @Field(() => [EmailRecord])
  @Property({ type: EmailRecord, id: false, required: true })
  emails!: EmailRecord[];

  @Field(() => [RemoteReference])
  @Property({ id: false, type: RemoteReference, required: true })
  subscriptions!: RemoteReference[];
}

export const UserModel = getModelForClass(User);
