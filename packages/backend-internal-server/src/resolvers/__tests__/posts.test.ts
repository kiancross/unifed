/*
 * CS3099 Group A3
 */

import test from "ava";
import nock from "nock";
import { Container } from "typedi";
import { graphql } from "graphql";
import { setup, generatePost } from "@unifed/backend-testing";

import { getMergedSchema } from "../../schema";

setup(test);

test.serial("Create post valid", async (t) => {
  const post = generatePost("all");
  post.author.host = "createPostValid";

  const scope = nock("http://createPostValid").post("/fed/posts").reply(200, post.toJSON());

  const response = await graphql(
    await getMergedSchema(Container.of()),
    `
      mutation($title: String!, $body: String!) {
        createPost(
          post: { community: { host: "createPostValid", id: "all" }, title: $title, body: $body }
        ) {
          id
          title
          body
          author {
            id
            host
          }
        }
      }
    `,
    null,
    {
      user: {
        id: post.author.id,
      },
    },
    {
      title: post.title,
      body: post.body,
    },
  );

  if (!response.data) {
    t.fail();
    return;
  }

  t.is(response.data.createPost.title, post.title);
  t.is(response.data.createPost.body, post.body);
  t.is(response.data.createPost.author.id, post.author.id);
  t.is(response.data.createPost.author.host, "createPostValid");

  scope.done();
});
