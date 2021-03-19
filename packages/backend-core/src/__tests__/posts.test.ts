/*
 * CS3099 Group A3
 */

import test from "ava";
import { InvalidPostBodyFormatError, InvalidPostBodyTypeError, extractPostBody } from "../posts";

test("With string", (t) => {
  t.throws(() => extractPostBody("foo"), { instanceOf: InvalidPostBodyFormatError });
});

test("With empty object", (t) => {
  t.throws(() => extractPostBody({}), { instanceOf: InvalidPostBodyFormatError });
});

test("With content string", (t) => {
  t.throws(() => extractPostBody({ content: "foo" }), { instanceOf: InvalidPostBodyFormatError });
});

test("With invalid content", (t) => {
  t.throws(() => extractPostBody({ content: [{ foo: "bar" }] }), {
    instanceOf: InvalidPostBodyFormatError,
  });
});

test("With multiple keys", (t) => {
  t.throws(() => extractPostBody({ content: [{ foo: "bar", bar: "baz" }] }), {
    instanceOf: InvalidPostBodyFormatError,
  });
});

test("Wrong property", (t) => {
  t.throws(() => extractPostBody({ content: [{ markdown: { text: "foo" } }] }), {
    instanceOf: InvalidPostBodyFormatError,
  });
});

test("Invalid type", (t) => {
  t.throws(() => extractPostBody({ content: [{ foo: { foo: "foo" } }] }), {
    instanceOf: InvalidPostBodyTypeError,
  });
});

test("Valid", (t) => {
  const result = extractPostBody({ content: [{ markdown: { markdown: "foo" } }] });

  t.deepEqual(result, {
    contentType: "markdown",
    body: "foo",
  });
});
