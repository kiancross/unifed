/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Lewis Mazzei
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
import { validateCommunityDescription } from "../community-description";

test("Empty", (t) => {
  t.false(validateCommunityDescription(""));
});

test("1 character (boundary)", (t) => {
  t.true(validateCommunityDescription("a"));
});

test("128 characters (boundary)", (t) => {
  t.true(validateCommunityDescription("a".repeat(128)));
});

test("129 characters (too long)", (t) => {
  t.false(validateCommunityDescription("a".repeat(129)));
});

test("Example", (t) => {
  t.true(
    validateCommunityDescription(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ),
  );
});
