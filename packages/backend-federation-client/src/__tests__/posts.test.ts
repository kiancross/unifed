/*
 * CS3099 Group A3
 */

import test from "ava";
import nock from "nock";
import { Container } from "typedi";
import { PostsHttpService } from "../posts";

let postsHttpService: PostsHttpService;

test.beforeEach(() => {
  postsHttpService = Container.get(PostsHttpService);
});

test("getPosts none", async (t) => {
  const scope = nock("http://getPostsNone")
    .get("/fed/posts")
    .query({ community: "foo" })
    .reply(200, []);

  t.deepEqual(await postsHttpService.getAll("getPostsNone", "foo"), []);

  scope.done();
});
