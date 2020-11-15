/*
 * CS3099 Group A3
 */

import test from "ava";
import { validateUsername } from "../username";

test("Lowercase character", (t) => {
  t.true(validateUsername("a"));
});

test("Uppercase character", (t) => {
  t.true(validateUsername("A"));
});

test("Empty", (t) => {
  t.false(validateUsername(""));
});

test("25 characters (too long)", (t) => {
  t.false(validateUsername("a".repeat(25)));
});

test("24 characters (boundary)", (t) => {
  t.true(validateUsername("a".repeat(24)));
});

test("Underscore", (t) => {
  t.true(validateUsername("_"));
});

test("Number", (t) => {
  t.true(validateUsername("1"));
});

test("Fullstop", (t) => {
  t.false(validateUsername("."));
});

test("Dash", (t) => {
  t.true(validateUsername("-"));
});

test("Example", (t) => {
  t.true(validateUsername("exa-mple_user1"));
});
