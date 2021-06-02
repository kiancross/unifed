/*
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2021 Allan Mathew Chacko
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
