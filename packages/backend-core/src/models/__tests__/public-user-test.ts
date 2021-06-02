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
import { validate } from "class-validator";
import { PublicUser, UserProfile } from "../public-user";

test("Invalid username", async (t) => {
  const user = new PublicUser();
  user.profile = new UserProfile();
  user.profile.name = "foo";

  const result = await validate(user);

  t.is(result.length, 1);
});

test("Invalid profile", async (t) => {
  const user = new PublicUser();
  user.username = "foo";

  const result = await validate(user);

  t.is(result.length, 1);
});

test("toJSON", (t) => {
  const user = new PublicUser();
  user.username = "foo";

  user.profile = new UserProfile();
  user.profile.name = "bar";

  t.deepEqual(user.toJSON(), {
    username: "foo",
    profile: {
      name: "bar",
    },
  });
});
