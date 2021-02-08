/*
 * CS3099 Group A3
 */

import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { Base } from "./base";
import { RemoteReference } from "./remote-reference";

@ObjectType()
export class UserProfile {
  @Field()
  @Property({ required: true })
  name!: string;
}

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
export class User extends Base {
  @Field()
  @Property({ required: true })
  username!: string;

  @Field(() => [EmailRecord])
  @Property({ id: false, required: true })
  emails!: EmailRecord[];

  @Field()
  @Property({ _id: false, required: true })
  profile!: UserProfile;

  @Field(() => [RemoteReference])
  @Property({ id: false, required: true })
  subscriptions!: RemoteReference[];
}

export const UserModel = getModelForClass(User);
