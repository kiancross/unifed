/*
 * CS3099 Group A3
 */

import test from "ava";
import nock from "nock";
import { Container } from "typedi";
import { setup, generatePost, generateUser } from "@unifed/backend-testing";
import { UserModel } from "@unifed/backend-core";

import { PostsService } from "../posts";

setup(test);

let postsService: PostsService;

test.beforeEach(() => {
  postsService = Container.get(PostsService);
});

test.serial("Create post valid", async (t) => {
  const post = generatePost("all");
  post.author.host = "createPostValid";

  const user = generateUser();

  UserModel.create(user);

  const scope = nock("http://createPostValid").post("/fed/posts").reply(200, post.toJSON());

  const createdPost = await postsService.create(user.username, "createPostValid", {
    community: "all",
    title: "bar",
    body: "baz",
  });

  const result = await UserModel.findOne({ username: user.username });

  if (result === null) {
    t.fail();
    return;
  }

  t.is(result.posts.length, 1);
  t.is(result.posts[0].id, createdPost.id);
  t.is(result.posts[0].host, "createPostValid");

  scope.done();
});
