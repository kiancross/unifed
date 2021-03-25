/*
 * CS3099 Group A3
 */

import test from "ava";
import { validate } from "class-validator";
import { Base } from "../base";

class MockBase extends Base {}

test("Valid", async (t) => {
  const base = new MockBase();
  base.id = "foo";
  base.host = "foo.edu";

  const result = await validate(base);

  t.is(result.length, 0);
  t.is(base.id, "foo");
  t.is(base.host, "foo.edu");
});

test("Modified", async (t) => {
  const time = 1614322800;
  const date = new Date(time * 1000);

  const base = new MockBase();
  base.modified = time;

  t.deepEqual(base.updatedAt, date);
  t.is(base.modified, time);
});

test("Created", async (t) => {
  const time = 1614322800;
  const date = new Date(time * 1000);

  const base = new MockBase();
  base.created = time;

  t.deepEqual(base.createdAt, date);
  t.is(base.created, time);
});

test("toJSON", (t) => {
  const base = new MockBase();
  base.id = "foo";

  t.deepEqual(base.toJSON(), { id: "foo" });
});
