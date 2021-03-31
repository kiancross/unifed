/*
 * CS3099 Group A3
 */

import test from "ava";
import { validateCommunityDescription } from "../community-description";

test("Empty", (t) => {
  t.false(validateCommunityDescription(""));
});

test("1 character (boundary)", (t) => {
  t.true(validateCommunityDescription("a"));
});

test("128 characters (boundary)", (t) => {
  t.true(validateCommunityDescription("a".repeat(128)));
});

test("129 characters (too long)", (t) => {
  t.false(validateCommunityDescription("a".repeat(129)));
});

test("Example", (t) => {
  t.true(
    validateCommunityDescription(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ),
  );
});
