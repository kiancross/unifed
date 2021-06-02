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
import request from "supertest";
import { setup, generateCommunity, generatePost } from "@unifed/backend-testing";
import { PostModel, CommunityModel } from "@unifed/backend-core";
import { app } from "../app";

setup(test);

test.serial("Limit filter NaN", async (t) => {
  const { body } = await request(app)
    .get("/posts?limit=foo")
    .expect(400)
    .expect("Content-Type", /json/);

  t.true(typeof body.title === "string");
});

test.serial("Limit filter negative", async (t) => {
  const { body } = await request(app)
    .get("/posts?limit=-1")
    .expect(400)
    .expect("Content-Type", /json/);

  t.true(typeof body.title === "string");
});

test.serial("minDate filter NaN", async (t) => {
  const { body } = await request(app)
    .get("/posts?minDate=foo")
    .expect(400)
    .expect("Content-Type", /json/);

  t.true(typeof body.title === "string");
});

test.serial("minDate filter negative", async (t) => {
  const { body } = await request(app)
    .get("/posts?minDate=-1")
    .expect(400)
    .expect("Content-Type", /json/);

  t.true(typeof body.title === "string");
});

test.serial("community does not exist filter", async (t) => {
  const { body } = await request(app)
    .get("/posts?community=all")
    .expect(400)
    .expect("Content-Type", /json/);

  t.true(typeof body.title === "string");
});

test.serial("Get posts", async (t) => {
  const community = generateCommunity();
  const post = generatePost(community.id);

  await CommunityModel.create(community);
  await PostModel.create(post);

  const { body } = await request(app)
    .get(`/posts?minDate=0&community=${community.id}&limit=1`)
    .expect(200)
    .expect("Content-Type", /json/);

  t.deepEqual(body, [post.toJSON()]);
});

test.serial("Get post", async (t) => {
  const post = generatePost("all");

  await PostModel.create(post);

  const { body } = await request(app)
    .get(`/posts/${post.id}`)
    .expect(200)
    .expect("Content-Type", /json/);

  t.deepEqual(body, post.toJSON());
});

test.serial("Create post without community", async (t) => {
  const post = generatePost("all");

  const { body } = await request(app)
    .post("/posts")
    .set("User-ID", post.author.id)
    .set("Client-Host", post.author.host)
    .send(post.toJSON())
    .expect(400)
    .expect("Content-Type", /json/);

  t.true(typeof body.title === "string");
});

test.serial("Create post invalid content array", async (t) => {
  const post = generatePost("all");

  const postJSON = {
    ...post.toJSON(),
    content: "foo",
  };

  const { body } = await request(app)
    .post("/posts")
    .set("User-ID", post.author.id)
    .set("Client-Host", post.author.host)
    .send(postJSON)
    .expect(400)
    .expect("Content-Type", /json/);

  t.true(typeof body.title === "string");
});

test.serial("Create post invalid content type", async (t) => {
  const post = generatePost("all");

  const postJSON = {
    ...post.toJSON(),
    content: [
      {
        foo: { foo: "" },
      },
    ],
  };

  const { body } = await request(app)
    .post("/posts")
    .set("User-ID", post.author.id)
    .set("Client-Host", post.author.host)
    .send(postJSON)
    .expect(501)
    .expect("Content-Type", /json/);

  t.true(typeof body.title === "string");
});

test.serial("Create post multiple content keys", async (t) => {
  const post = generatePost("all");

  const postJSON = {
    ...post.toJSON(),
    content: [
      {
        foo: {},
        bar: {},
      },
    ],
  };

  const { body } = await request(app)
    .post("/posts")
    .set("User-ID", post.author.id)
    .set("Client-Host", post.author.host)
    .send(postJSON)
    .expect(400)
    .expect("Content-Type", /json/);

  t.true(typeof body.title === "string");
});

test.serial("Create post empty title", async (t) => {
  const post = generatePost("all");

  const postJSON = {
    ...post.toJSON(),
    title: "",
  };

  const { body } = await request(app)
    .post("/posts")
    .set("User-ID", post.author.id)
    .set("Client-Host", post.author.host)
    .send(postJSON)
    .expect(400)
    .expect("Content-Type", /json/);

  t.true(typeof body.title === "string");
});

test.serial("Create post no author", async (t) => {
  const post = generatePost("all");

  const { body } = await request(app)
    .post("/posts")
    .send(post.toJSON())
    .expect(403)
    .expect("Content-Type", /json/);

  t.true(typeof body.title === "string");
});

test.serial("Create valid", async (t) => {
  const community = generateCommunity();
  const post = generatePost(community.id);

  await CommunityModel.create(community);

  const { body } = await request(app)
    .post("/posts")
    .set("User-ID", post.author.id)
    .set("Client-Host", post.author.host)
    .send(post.toJSON())
    .expect(200)
    .expect("Content-Type", /json/);

  post.approved = body.approved;

  t.deepEqual(body, {
    ...post.toJSON(),
    modified: body.modified,
    created: body.created,
  });
});

test.serial("Delete own", async (t) => {
  const post = generatePost("all");

  await PostModel.create(post);

  await request(app)
    .delete(`/posts/${post.id}`)
    .set("User-ID", post.author.id)
    .set("Client-Host", post.author.host)
    .send(post.toJSON())
    .expect(200);

  t.pass();
});

test.serial("Delete other", async (t) => {
  const post = generatePost("all");

  await PostModel.create(post);

  await request(app)
    .delete(`/posts/${post.id}`)
    .set("User-ID", post.author.id + "foo")
    .set("Client-Host", post.author.host)
    .send(post.toJSON())
    .expect(403)
    .expect("Content-Type", /json/);

  t.pass();
});

test.serial("Update own", async (t) => {
  const post = generatePost("all");

  await PostModel.create(post);

  post.title = "foo";
  post.body = "bar";

  const { body } = await request(app)
    .put(`/posts/${post.id}`)
    .send({
      title: post.title,
      content: post.toJSON().content,
    })
    .set("User-ID", post.author.id)
    .set("Client-Host", post.author.host)
    .send(post.toJSON())
    .expect(200);

  post.approved = body.approved;

  t.deepEqual(body, {
    ...post.toJSON(),
    modified: body.modified,
    created: body.created,
  });
});

test.serial("Update other", async (t) => {
  const post = generatePost("all");

  await PostModel.create(post);

  await request(app)
    .put(`/posts/${post.id}`)
    .send({
      title: post.title,
      content: post.toJSON().content,
    })
    .set("User-ID", post.author.id + "foo")
    .set("Client-Host", post.author.host)
    .send(post.toJSON())
    .expect(403)
    .expect("Content-Type", /json/);

  t.pass();
});
