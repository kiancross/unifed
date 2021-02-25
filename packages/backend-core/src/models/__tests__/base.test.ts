/*
 * CS3099 Group A3
 */

import test from "ava";
import { validate } from "class-validator";
import { Base } from "../base";

class MockBase extends Base {}

const uuid = "75442486-0878-440c-9db1-a7006c25a39f";

test("Invalid ID", async (t) => {
  const base = new MockBase();
  base.host = "foo.edu";

  const result = await validate(base);

  t.is(result.length, 1);
});

test("Invalid host", async (t) => {
  const base = new MockBase();
  base.id = uuid;

  const result = await validate(base);

  t.is(result.length, 1);
});

test("Valid", async (t) => {
  const base = new MockBase();
  base.id = uuid;
  base.host = "foo.edu";

  const result = await validate(base);

  t.is(result.length, 0);
  t.is(base.id, uuid);
  t.is(base.host, "foo.edu");
});

test("toJSON", (t) => {
  const base = new MockBase();
  base.id = uuid;

  t.deepEqual(base.toJSON(), { id: uuid });
});
