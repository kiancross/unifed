/*
 * CS3099 Group A3
 */

import test from "ava";
import { validateName } from "../name";

test("Empty", (t) => {
  t.false(validateName(""));
});

test("1 character (boundary)", (t) => {
  t.true(validateName("a"));
});

test("64 characters (boundary)", (t) => {
  t.true(validateName("a".repeat(64)));
});

test("65 characters (too long)", (t) => {
  t.false(validateName("a".repeat(65)));
});

test("Example", (t) => {
  t.true(validateName("John Smith"));
});
