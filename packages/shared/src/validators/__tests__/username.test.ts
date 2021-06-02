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
import { validateUsername } from "../username";

test("Lowercase character", (t) => {
  t.true(validateUsername("a"));
});

test("Uppercase character", (t) => {
  t.true(validateUsername("A"));
});

test("Empty", (t) => {
  t.false(validateUsername(""));
});

test("25 characters (too long)", (t) => {
  t.false(validateUsername("a".repeat(25)));
});

test("24 characters (boundary)", (t) => {
  t.true(validateUsername("a".repeat(24)));
});

test("Underscore", (t) => {
  t.true(validateUsername("_"));
});

test("Number", (t) => {
  t.true(validateUsername("1"));
});

test("Fullstop", (t) => {
  t.false(validateUsername("."));
});

test("Dash", (t) => {
  t.true(validateUsername("-"));
});

test("Example", (t) => {
  t.true(validateUsername("exa-mple_user1"));
});
