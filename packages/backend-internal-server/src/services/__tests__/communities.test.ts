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
import { Container } from "typedi";
import { CommunityModel } from "@unifed/backend-core";
import { setup } from "@unifed/backend-testing";

import { CommunitiesService } from "../communities";

setup(test);

let communitiesService: CommunitiesService;

test.beforeEach(() => {
  communitiesService = Container.get(CommunitiesService);
});

test.serial("Create community valid", async (t) => {
  t.true(await communitiesService.create("foo", "bar", "title", "description"));

  const result = await CommunityModel.findOne({ _id: "bar" });

  if (result === null) {
    t.fail();
    return;
  }

  t.is(result.title, "title");
  t.is(result.description, "description");
  t.is(result.admins.length, 1);
  t.is(result.admins[0].id, "foo");
  t.is(result.admins[0].host, "this");
});
