/*
 * CS3099 Group A3
 */

import { createMethodDecorator } from "type-graphql";
import { User } from "unifed-backend-core";

export function AuthoriseUser() {
  return createMethodDecorator<{ user: User }>(async ({ context }, next) => {
    if (context.user) {
      return next();
    } else {
      throw new Error("User not authenticated");
    }
  });
}
