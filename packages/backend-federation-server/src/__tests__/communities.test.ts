/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
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
import request from "supertest";
import {
  setup,
  generateCommunities,
  generateCommunity,
  generatePost,
} from "@unifed/backend-testing";
import { app } from "../app";
import { CommunityModel, PostModel } from "@unifed/backend-core";

setup(test);

test.serial("Get communities", async (t) => {
  const communities = generateCommunities(5);
  await CommunityModel.create(communities);

  const { body } = await request(app)
    .get("/communities")
    .expect(200)
    .expect("Content-Type", /json/);

  t.is(body.length, communities.length);

  for (const community of communities) {
    t.true(body.includes(community.id));
  }
});

test.serial("Get non-existing community", async (t) => {
  const { body } = await request(app)
    .get(`/communities/foo`)
    .expect(404)
    .expect("Content-Type", /json/);

  t.true(typeof body.title === "string");
});

test.serial("Get existing community", async (t) => {
  const community = generateCommunity();
  await CommunityModel.create(community);

  const { body } = await request(app)
    .get(`/communities/${community.id}`)
    .expect(200)
    .expect("Content-Type", /json/);

  t.deepEqual(body, community.toJSON());
});

test.serial("Get timestamps empty", async (t) => {
  const community = generateCommunity();
  await CommunityModel.create(community);

  const { body } = await request(app)
    .get(`/communities/${community.id}/timestamps`)
    .expect(200)
    .expect("Content-Type", /json/);

  t.is(body.length, 0);
});

test.serial("Get timestamps", async (t) => {
  const community = generateCommunity();
  await CommunityModel.create(community);

  const post = generatePost(community.id);

  await PostModel.create(post);

  const { body } = await request(app)
    .get(`/communities/${community.id}/timestamps`)
    .expect(200)
    .expect("Content-Type", /json/);

  t.deepEqual(body, [{ id: post.id, modified: post.modified }]);
});
