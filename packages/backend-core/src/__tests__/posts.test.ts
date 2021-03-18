/*
 * CS3099 Group A3
 */

import test from "ava";
import { InvalidPostBodyError, extractPostBody } from "../posts";

test("With string", (t) => {
  t.throws(() => extractPostBody("foo"), { instanceOf: InvalidPostBodyError });
});

test("With empty object", (t) => {
  t.throws(() => extractPostBody({}), { instanceOf: InvalidPostBodyError });
});

test("With content string", (t) => {
  t.throws(() => extractPostBody({ content: "foo" }), { instanceOf: InvalidPostBodyError });
});

test("With invalid content", (t) => {
  t.throws(() => extractPostBody({ content: [{ foo: "bar" }] }), {
    instanceOf: InvalidPostBodyError,
  });
});

test("With multiple keys", (t) => {
  t.throws(() => extractPostBody({ content: [{ foo: "bar", bar: "baz" }] }), {
    instanceOf: InvalidPostBodyError,
  });
});

test("Wrong property", (t) => {
  t.throws(() => extractPostBody({ content: [{ markdown: { text: "foo" } }] }), {
    instanceOf: InvalidPostBodyError,
  });
});

test("Valid", (t) => {
  const result = extractPostBody({ content: [{ markdown: { markdown: "foo" } }] });

  t.deepEqual(result, {
    contentType: "markdown",
    body: "foo",
  });
});
