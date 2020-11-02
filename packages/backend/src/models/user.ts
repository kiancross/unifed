/*
 * CS3099 Group A3
 */

import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";

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
export class User {
  @Field(() => ID)
  id!: number;

  @Field()
  @Property({ required: true })
  username!: string;

  @Field(() => [EmailRecord])
  @Property({ required: true })
  emails!: EmailRecord[];

  @Field()
  @Property({ _id: false, required: true })
  profile!: UserProfile;
}

export const UserModel = getModelForClass(User);
