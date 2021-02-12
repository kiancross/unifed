/*
 * CS3099 Group A3
 */

import test from "ava";
import { User } from "../user";

test("New user", (t) => {
  new User();
  t.pass();
});
