/*
 * CS3099 Group A3
 */

import os from "os";
import test from "ava";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import { lorem, random } from "faker";
import { MongoMemoryServer } from "mongodb-memory-server-core";
import { Community, CommunityModel } from "@unifed/backend-core";

const mongod = new MongoMemoryServer({
  binary: {
    downloadDir: `${os.homedir()}/.cache/mongodb-binaries`,
  },
});

function generateCommunity(): Community {
  const community = new Community();
  community.id = random.word();
  community.title = lorem.words();
  community.description = lorem.sentence();

  return community;
}

function generateCommunities(n: number): Community[] {
  const communities = [];

  for (let i = 0; i < n; i++) {
    communities.push(generateCommunity());
  }

  return communities;
}

test.before(async () => {
  const uri = await mongod.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

test.beforeEach(async () => {
  await CommunityModel.deleteMany({});
});

test.after.always(async () => {
  mongoose.disconnect();
  mongod.stop();
});

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
    .get(`/communities/${lorem.word()}`)
    .expect(404)
    .expect("Content-Type", /json/);

  t.true(typeof body.error === "string");
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
