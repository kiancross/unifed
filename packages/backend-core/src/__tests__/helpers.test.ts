/*
 * CS3099 Group A3
 */

import test from "ava";
import { getValidationMessage } from "../helpers";

test("Empty", (t) => {
  t.is(getValidationMessage([]), undefined);
});

test("Two", (t) => {
  t.is(
    getValidationMessage([
      {
        property: "foo",
        constraints: {
          foo: "bar",
          bar: "baz",
        },
      },
      {
        property: "too",
        constraints: {
          foo: "tar",
          bar: "taz",
        },
      },
    ]),
    "bar\nbaz\ntar\ntaz",
  );
});
