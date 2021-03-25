/*
 * CS3099 Group A3
 */

import { lorem } from "faker";
import { v4 as uuid } from "uuid";
import { Post, RemoteReference } from "@unifed/backend-core";

export const generatePost = (community: string): Post => {
  const post = new Post();
  post.community = community;
  post.id = uuid();
  post.title = lorem.words();
  post.body = lorem.paragraph();
  post.contentType = "markdown";
  post.updatedAt = new Date();
  post.createdAt = new Date();
  post.approved = true;
  post.children = [];
  post.parentPost = null;

  post.author = new RemoteReference();
  post.author.id = lorem.word();
  post.author.host = lorem.word();

  return post;
};
