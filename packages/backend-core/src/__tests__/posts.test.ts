/*
 * CS3099 Group A3
 */

import test from "ava";
import { extractPostBody } from "../posts";

test("With string", (t) => {
  t.throws(() => extractPostBody("foo"));
});

test("With empty object", (t) => {
  t.throws(() => extractPostBody({}));
});

test("With content string", (t) => {
  t.throws(() => extractPostBody({ content: "foo" }));
});

test("With invalid content", (t) => {
  t.is(extractPostBody({ content: [{ foo: "bar" }] }), undefined);
});

test("With multiple keys", (t) => {
  t.throws(() => extractPostBody({ content: [{ foo: "bar", bar: "baz" }] }));
});

test("Wrong property", (t) => {
  t.is(extractPostBody({ content: [{ markdown: { text: "foo" } }] }), undefined);
});

test("Valid", (t) => {
  const result = extractPostBody({ content: [{ markdown: { markdown: "foo" } }] });

  if (result === undefined) {
    t.false(result === undefined);
    return;
  }

  t.is(result[0], "markdown");
  t.is(result[1], "foo");
});
