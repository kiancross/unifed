/*
 * CS3099 Group A3
 */

import test from "ava";
import { isStringArray, RemoteResponseError } from "../helpers";

test("RemoteResponseError", (t) => {
  const error = new RemoteResponseError("foo");
  t.regex(error.message, /foo/);
});

test("isStringArray empty", (t) => {
  t.true(isStringArray([]));
});

test("isStringArray not array", (t) => {
  t.false(isStringArray("something else"));
});

test("isStringArray array of numbers", (t) => {
  t.false(isStringArray([1, 2]));
});

test("isStringArray mixture", (t) => {
  t.false(isStringArray(["string", 2]));
});

test("isStringArray array of strings", (t) => {
  t.true(isStringArray(["string", "another string"]));
});
