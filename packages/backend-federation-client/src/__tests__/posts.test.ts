/*
 * CS3099 Group A3
 */

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

  t.deepEqual(await postsService.getAll("getPostsNone", "foo"), []);

  scope.done();
});
