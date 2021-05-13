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
import nock from "nock";
import { Container } from "typedi";
import { generatePost } from "@unifed/backend-testing";
import { PostsFederationService } from "../posts";
import { RemoteResponseError } from "../helpers";

let postsService: PostsFederationService;

test.beforeEach(() => {
  postsService = Container.get(PostsFederationService);
});

test("Get posts none", async (t) => {
  const scope = nock("http://getPostsNone")
    .get("/fed/posts")
    .query({ community: "bar" })
    .reply(200, []);

  t.deepEqual(await postsService.getByCommunity("foo", "getPostsNone", "bar"), []);

  scope.done();
});

test("Get by community", async (t) => {
  const post = generatePost("all");
  post.author.host = "getByCommunity";

  const scope = nock("http://getByCommunity")
    .get("/fed/posts")
    .query({ community: "all" })
    .reply(200, [post.toJSON()]);

  const result = await postsService.getByCommunity("foo", "getByCommunity", "all");
  t.deepEqual(
    result.map((post) => post.toJSON()),
    [post.toJSON()],
  );
  scope.done();
});

test("Create post valid", async (t) => {
  const post = generatePost("all");
  post.author.host = "createPostValid";

  const scope = nock("http://createPostValid").post("/fed/posts").reply(200, post.toJSON());

  const responsePost = await postsService.create(post.author.id, "createPostValid", {
    community: "all",
    title: post.title,
    body: post.body,
  });

  post.host = "createPostValid";

  if (responsePost === null) {
    t.false(responsePost === null);
    return;
  }

  t.deepEqual(responsePost.toJSON(), post.toJSON());
  scope.done();
});

test("Create post invalid", async (t) => {
  const post = generatePost("all");
  post.author.host = "createPostInvalid";

  const scope = nock("http://createPostInvalid").post("/fed/posts").reply(400, post.toJSON());

  await t.throwsAsync(
    async () =>
      await postsService.create(post.author.id, "createPostInvalid", {
        community: "all",
        title: "",
        body: post.body,
      }),
    {
      instanceOf: RemoteResponseError,
    },
  );

  scope.done();
});

test("Delete post", async (t) => {
  const scope = nock("http://deletePost").delete("/fed/posts/bar").reply(200);

  await postsService.delete("foo", "deletePost", "bar");

  t.pass();
  scope.done();
});
