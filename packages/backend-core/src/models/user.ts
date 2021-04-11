/*
 * CS3099 Group A3
 */

import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { PublicUser } from "./public-user";
import { RemoteReference } from "./remote-reference";

/**
 * Entity representing a user's email record.
 *
 * This is a copy of the AccountJS schema and
 * is simply to allow access to the fields that
 * they set.
 *
 * @internal
 */
@ObjectType()
class EmailRecord {
  /**
   * The email address.
   */
  @Field({ nullable: true })
  @Property()
  address?: string;

  /**
   * Whether the email address has been
   * verified.
   */
  @Field({ nullable: true })
  @Property()
  verified?: boolean;
}

/**
 * Entity representing a user.
 */
@ObjectType()
export class User extends PublicUser {
  /**
   * The email addresses associated with the
   * user's account.
   */
  @Field(() => [EmailRecord])
  @Property({ id: false, type: EmailRecord, required: true })
  emails!: EmailRecord[];

  /**
   * Communities that the user is subscribed to.
   */
  @Field(() => [RemoteReference])
  @Property({ type: RemoteReference })
  subscriptions!: RemoteReference[];

  /**
   * Posts made by the user.
   */
  @Field(() => [RemoteReference])
  @Property({ type: RemoteReference })
  posts!: RemoteReference[];
}

/**
 * User model used for manipulating the MongoDB
 * database.
 */
export const UserModel = getModelForClass(User);
