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
import { Base } from "../base";

class MockBase extends Base {}

test("Valid", async (t) => {
  const base = new MockBase();
  base.id = "foo";
  base.host = "foo.edu";

  const result = await validate(base);

  t.is(result.length, 0);
  t.is(base.id, "foo");
  t.is(base.host, "foo.edu");
});

test("Modified", async (t) => {
  const time = 1614322800;
  const date = new Date(time * 1000);

  const base = new MockBase();
  base.modified = time;

  t.deepEqual(base.updatedAt, date);
  t.is(base.modified, time);
});

test("Created", async (t) => {
  const time = 1614322800;
  const date = new Date(time * 1000);

  const base = new MockBase();
  base.created = time;

  t.deepEqual(base.createdAt, date);
  t.is(base.created, time);
});

test("toJSON", (t) => {
  const base = new MockBase();
  base.id = "foo";

  t.deepEqual(base.toJSON(), { id: "foo" });
});
