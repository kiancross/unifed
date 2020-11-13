/*
 * CS3099 Group A3
 */

import test from "ava";
import { validatePassword } from "../password";

test("Weak", t => {
  const result = validatePassword("weak");

  t.false(result.valid);
  t.not(result.warning, undefined);

  if (result.warning) {
    t.regex(result.warning, /^.*$/);
  }

  for (const suggestion of result.suggestions) {
    t.regex(suggestion, /^.*$/);
  }
});

test("Strong", t => {
  const result = validatePassword("ThisIsAStr0ngP@55w0rd");

  t.true(result.valid);
  t.is(result.warning, undefined);
  t.is(result.suggestions.length, 0);
});
