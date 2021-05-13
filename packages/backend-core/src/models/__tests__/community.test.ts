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
import { validate } from "class-validator";
import { Community } from "../community";

test("Title too short", async (t) => {
  const community = new Community();
  community.id = "foo";
  community.title = "";
  community.description = "baz";
  community.admins = [];

  const result = await validate(community);

  t.is(result.length, 1);
});

test("Title too long", async (t) => {
  const community = new Community();
  community.id = "foo";
  community.title = "a".repeat(64 + 1);
  community.description = "baz";
  community.admins = [];

  const result = await validate(community);

  t.is(result.length, 1);
});

test("Description too short", async (t) => {
  const community = new Community();
  community.id = "foo";
  community.title = "bar";
  community.description = "";
  community.admins = [];

  const result = await validate(community);

  t.is(result.length, 1);
});

test("Description too long", async (t) => {
  const community = new Community();
  community.id = "foo";
  community.title = "bar";
  community.description = "a".repeat(10 * 1024 + 1);
  community.admins = [];

  const result = await validate(community);

  t.is(result.length, 1);
});

test("toJSON", (t) => {
  const community = new Community();
  community.id = "foo";
  community.title = "bar";
  community.description = "baz";

  t.deepEqual(community.toJSON(), {
    id: "foo",
    title: "bar",
    description: "baz",
    admins: [],
  });
});
