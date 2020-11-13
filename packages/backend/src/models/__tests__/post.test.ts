/*
 * CS3099 Group A3
 */

import test from "ava";
import { Post } from "../post";
import { RemoteReference } from "../remote-reference";

test("toJSON - community", t => {
  const post = new Post();
  post.id = "someid";
  post.community = "somecomm";
  post.title = "A title";
  post.contentType = "markdown";
  post.body = "This is a post body";
  post.author = new RemoteReference(); 
  post.author.id = "someusername";
  post.author.host = "somehost:420";
  post.createdAt = new Date("2020-11-13T09:25:10+00:00");
  post.updatedAt = new Date("2020-11-13T09:26:07+00:00");

  t.like(post.toJSON(), {
    id: "someid",
    parent: "somecomm",
    title: "A title",
    contentType: "markdown",
    body: "This is a post body",
    children: [],
    author: {
      id: "someusername",
      host: "somehost:420"
    },
    created: 1605259510,
    modified: 1605259567
  })
});

test("toJSON - post", t => {
  const post = new Post();
  post.id = "someid";
  post.community = "somecomm";
  post.parentPost = "parentpost"
  post.title = "A title";
  post.contentType = "markdown";
  post.body = "This is a post body";
  post.author = new RemoteReference(); 
  post.author.id = "someusername";
  post.author.host = "somehost:420";
  post.createdAt = new Date("2020-11-13T09:25:10+00:00");
  post.updatedAt = new Date("2020-11-13T09:26:07+00:00");

  t.like(post.toJSON(), {
    id: "someid",
    parent: "parentpost",
    title: "A title",
    contentType: "markdown",
    body: "This is a post body",
    children: [],
    author: {
      id: "someusername",
      host: "somehost:420"
    },
    created: 1605259510,
    modified: 1605259567
  })
})
