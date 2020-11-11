/*
 * CS3099 Group A3
 */

import got from "got";
import { getFederatedApiEndpoint } from "./utils";
import { Post, PostObject, RemoteReferenceObject } from "../../models";

type CreatePostObject = Omit<PostObject, "community"> | Record<"author", RemoteReferenceObject>;

export async function createPost(host: string, post: CreatePostObject) {
  try {
    return (await got
      .post(getFederatedApiEndpoint(host, ["posts"]), {
        json: post,
      })
      .json()) as Post;
  } catch (error) {
    if (error.response.statusCode === 400) {
      return null;
    } else {
      throw error;
    }
  }
}

export async function getPosts(host: string, community: string) {
  return (await got(getFederatedApiEndpoint(host, ["posts"]), {
    searchParams: {
      community,
    },
  }).json()) as Post[];
}

export async function getPost(host: string, post: string) {
  return (await got(getFederatedApiEndpoint(host, ["posts", post])).json()) as Post;
}
