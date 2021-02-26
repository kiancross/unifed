/*
 * CS3099 Group A3
 */

import test from "ava";
import nock from "nock";
import { Container } from "typedi";
import { PostsFederationService } from "../posts";

let postsService: PostsFederationService;

test.beforeEach(() => {
  postsService = Container.get(PostsFederationService);
});

test("getPosts none", async (t) => {
  const scope = nock("http://getPostsNone")
    .get("/fed/posts")
    .query({ community: "bar" })
    .reply(200, []);

  t.deepEqual(await postsService.getByCommunity("foo", "getPostsNone", "bar"), []);

  scope.done();
});

test("deletePost", async (t) => {
  const scope = nock("http://deletePost").delete("/fed/posts/bar").reply(200);

  await postsService.delete("foo", "deletePost", "bar");

  t.pass();
  scope.done();
});

test("updatePost", async (t) => {
  t.pass();
});
