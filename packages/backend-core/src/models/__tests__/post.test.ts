/*
 * CS3099 Group A3
 */

import test from "ava";
import { validate } from "class-validator";
import { Post } from "../post";
import { RemoteReference } from "../remote-reference";

const getPost = () => {
  const post = new Post();
  post.id = "foo";
  post.community = "bar";
  post.parentPost = "baz";
  post.title = "bat";
  post.contentType = "markdown";
  post.body = "bax";

  post.author = new RemoteReference();
  post.author.id = "mat";
  post.author.host = "foo.edu";

  post.approved = true;
  post.createdAt = new Date("2020-11-13T09:25:10+00:00");
  post.updatedAt = new Date("2020-11-13T09:26:07+00:00");

  return post;
};

test("Valid", async (t) => {
  const post = getPost();

  const result = await validate(post);

  t.is(result.length, 0);
});

test("Invalid community", async (t) => {
  const post = getPost();
  post.community = undefined;

  const result = await validate(post);

  t.is(result.length, 1);
});

test("Valid parentPost", async (t) => {
  const post = getPost();
  post.parentPost = undefined;

  const result = await validate(post);

  t.is(result.length, 0);
});

test("Title too long", async (t) => {
  const post = getPost();
  post.title = "a".repeat(128 + 1);

  const result = await validate(post);

  t.is(result.length, 1);
});

test("Invalid contentType", async (t) => {
  const post = getPost();
  post.contentType = "bar";

  const result = await validate(post);

  t.is(result.length, 1);
});

test("Body too short", async (t) => {
  const post = getPost();
  post.body = "";

  const result = await validate(post);

  t.is(result.length, 1);
});

test("Body too long", async (t) => {
  const post = getPost();
  post.body = "a".repeat(1024 * 1024 * 500 + 1);

  const result = await validate(post);

  t.is(result.length, 1);
});

test("toJSON", (t) => {
  const post = getPost();

  t.like(post.toJSON(), {
    id: "foo",
    community: "bar",
    parentPost: "baz",
    title: "bat",
    content: [
      {
        markdown: {
          markdown: "bax",
        },
      },
    ],
    children: [],
    author: {
      id: "mat",
      host: "foo.edu",
    },
    created: 1605259510,
    modified: 1605259567,
  });
});
