/*
 * CS3099 Group A3
 */

import test from "ava";
import nock from "nock";
import { Container } from "typedi";
import { generatePost } from "@unifed/backend-testing";
import { PostsFederationService } from "../posts";

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

  await postsService.getByCommunity("foo", "getByCommunity", "all");
  //t.deepEqual(result, [post]);
  t.pass();
  scope.done();
});

test("Create post valid", async (t) => {
  const post = generatePost("all");
  post.author.host = "createPostValid";

  const scope = nock("http://createPostValid").post("/fed/posts").reply(200, post.toJSON());

  const responsePost = await postsService.create(
    post.author.id,
    "createPostValid",
    "all",
    post.title,
    post.body,
  );

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

  const responsePost = await postsService.create(
    post.author.id,
    "createPostInvalid",
    "all",
    "",
    post.body,
  );

  t.true(responsePost === null);
  scope.done();
});

test("Delete post", async (t) => {
  const scope = nock("http://deletePost").delete("/fed/posts/bar").reply(200);

  await postsService.delete("foo", "deletePost", "bar");

  t.pass();
  scope.done();
});
