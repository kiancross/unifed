/*
 * CS3099 Group A3
 */

import test from "ava";
import { Base } from "../base";

class MockBase extends Base {}

test("id getter", (t) => {
  const base = new MockBase();
  t.is(base.id, undefined);
});

test("id setter", (t) => {
  const base = new MockBase();
  base.id = "someid";
  t.is(base.id, "someid");
});

test("toJSON", (t) => {
  const base = new MockBase();
  base.id = "someid";
  t.deepEqual(base.toJSON(), { id: "someid" });
});
