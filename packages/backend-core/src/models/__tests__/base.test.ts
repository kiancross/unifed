/*
 * CS3099 Group A3
 */

import test from "ava";
import { validate } from "class-validator";
import { Base } from "../base";

class MockBase extends Base {}

test("Invalid ID", async (t) => {
  const base = new MockBase();
  base.host = "foo.edu";

  const result = await validate(base);

  t.is(result.length, 1);
});

test("Valid", async (t) => {
  const base = new MockBase();
  base.id = "foo";
  base.host = "foo.edu";

  const result = await validate(base);

  t.is(result.length, 0);
  t.is(base.id, "foo");
  t.is(base.host, "foo.edu");
});

test("toJSON", (t) => {
  const base = new MockBase();
  base.id = "foo";

  t.deepEqual(base.toJSON(), { id: "foo" });
});
