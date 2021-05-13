/*
 * Copyright (C) 2020 Kian Cross
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
import { isStringArray, RemoteResponseError } from "../helpers";

test("RemoteResponseError", (t) => {
  const error = new RemoteResponseError("foo");
  t.regex(error.message, /foo/);
});

test("isStringArray empty", (t) => {
  t.true(isStringArray([]));
});

test("isStringArray not array", (t) => {
  t.false(isStringArray("something else"));
});

test("isStringArray array of numbers", (t) => {
  t.false(isStringArray([1, 2]));
});

test("isStringArray mixture", (t) => {
  t.false(isStringArray(["string", 2]));
});

test("isStringArray array of strings", (t) => {
  t.true(isStringArray(["string", "another string"]));
});
