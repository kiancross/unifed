/*
 * CS3099 Group A3
 */

import test from "ava";
import request from "supertest";
import { setup, generateCommunities, generateCommunity } from "@unifed/backend-testing";
import { app } from "../app";
import { CommunityModel } from "@unifed/backend-core";

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
