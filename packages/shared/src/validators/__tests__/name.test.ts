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
import { validateName } from "../name";

test("Empty", (t) => {
  t.false(validateName(""));
});

test("1 character (boundary)", (t) => {
  t.true(validateName("a"));
});

test("64 characters (boundary)", (t) => {
  t.true(validateName("a".repeat(64)));
});

test("65 characters (too long)", (t) => {
  t.false(validateName("a".repeat(65)));
});

test("Example", (t) => {
  t.true(validateName("John Smith"));
});
