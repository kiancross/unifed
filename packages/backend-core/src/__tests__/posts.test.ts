/*
 * Copyright (C) 2021 Kian Cross
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
    instanceOf: InvalidPostBodyTypeError,
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
