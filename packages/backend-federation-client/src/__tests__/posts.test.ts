/*
 * CS3099 Group A3
 */

process.env.UNIFED_SITE_HOST = "localhost:8080";

import test from "ava";
import nock from "nock";
import { Container } from "typedi";
import { PostsService } from "../posts";

let postsService: PostsService;

test.beforeEach(() => {
  postsService = Container.get(PostsService);
});

test("getPosts none", async (t) => {
  const scope = nock("http://getPostsNone")
    .get("/fed/posts")
    .query({ community: "foo" })
    .reply(200, []);

  t.deepEqual(await postsService.getByCommunity("getPostsNone", "foo"), []);

  scope.done();
});

test("deletePost", async (t) => {
  const scope = nock("http://deletePost").delete("/fed/posts/foo").reply(200);

  await postsService.delete("deletePost", "foo");

  t.pass();
  scope.done();
});

test("updatePost", async (t) => {
  const scope = nock("http://updatePost").put("/fed/posts/foo").reply(200);

  await postsService.update("updatePost", "foo", "title", "body");

  t.pass();
  scope.done();
});
