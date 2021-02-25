/*
 * CS3099 Group A3
 */

import test from "ava";
import { validate } from "class-validator";
import { Community } from "../community";

test("Title too short", async (t) => {
  const community = new Community();
  community.id = "foo";
  community.title = "";
  community.description = "baz";
  community.admins = [];

  const result = await validate(community);

  t.is(result.length, 1);
});

test("Title too long", async (t) => {
  const community = new Community();
  community.id = "foo";
  community.title = "a".repeat(64 + 1);
  community.description = "baz";
  community.admins = [];

  const result = await validate(community);

  t.is(result.length, 1);
});

test("Description too short", async (t) => {
  const community = new Community();
  community.id = "foo";
  community.title = "bar";
  community.description = "";
  community.admins = [];

  const result = await validate(community);

  t.is(result.length, 1);
});

test("Description too long", async (t) => {
  const community = new Community();
  community.id = "foo";
  community.title = "bar";
  community.description = "a".repeat(10 * 1024 + 1);
  community.admins = [];

  const result = await validate(community);

  t.is(result.length, 1);
});

test("toJSON", (t) => {
  const community = new Community();
  community.id = "foo";
  community.title = "bar";
  community.description = "baz";

  t.deepEqual(community.toJSON(), {
    id: "foo",
    title: "bar",
    description: "baz",
    admins: [],
  });
});
