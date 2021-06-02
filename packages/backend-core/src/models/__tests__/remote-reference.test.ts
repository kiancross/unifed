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
import { RemoteReference } from "../remote-reference";

test("Internal reference", async (t) => {
  const reference = new RemoteReference();
  reference.id = "foo";
  reference.host = "this";

  t.deepEqual(reference.toJSON(), {
    id: "foo",
    host: "localhost:8080",
  });
});

test("Unset host", async (t) => {
  const reference = new RemoteReference();
  reference.id = "foo";

  t.throws(() => reference.toJSON());
});

test("toJSON", (t) => {
  const reference = new RemoteReference();
  reference.id = "foo";
  reference.host = "bar";

  t.deepEqual(reference.toJSON(), {
    id: "foo",
    host: "bar",
  });
});
