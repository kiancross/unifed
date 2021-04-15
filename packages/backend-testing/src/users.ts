/*
 * CS3099 Group A3
 */

import { internet, name } from "faker";
import { v4 as uuid } from "uuid";
import { User, UserProfile } from "@unifed/backend-core";

/**
 * Generates a test user with random attributes (id, username, name).
 * 
 * @returns 
 */
export const generateUser = (): User => {
  const user = new User();
  user.id = uuid();
  user.username = internet.userName();

  user.profile = new UserProfile();
  user.profile.name = `${name.firstName()} ${name.lastName()}`;

  return user;
};
