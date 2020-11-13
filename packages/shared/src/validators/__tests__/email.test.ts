/*
 * CS3099 Group A3
 */

import test from "ava";
import { validateEmail } from "../email";

test("Invalid", t => {
  t.false(validateEmail("invalid"));
});

test("Valid", t => {
  t.true(validateEmail("test@gmail.com"));
});
