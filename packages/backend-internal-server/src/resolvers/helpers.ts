/*
 * CS3099 Group A3
 */

import { createParamDecorator } from "type-graphql";
import { User } from "unifed-backend-core";

export function CurrentUser() {
  return createParamDecorator<{ user: User }>(({ context }) => context.user);
}
