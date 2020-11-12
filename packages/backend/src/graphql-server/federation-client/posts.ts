/*
 * CS3099 Group A3
 */

import got from "got";
import { getFederatedApiEndpoint } from "./utils";
import { Post, User } from "../../models";
import { config } from "../../utils";

export async function createPost(host: string, user: User, parent: string, title: string, body: string) {

  try {
    const rawPost = await got.post(getFederatedApiEndpoint(host, ["posts"]), {
      json: {
        parent, title, body,
        contentType: "markdown",
        author: {
          id: user.username,
          host: config.siteHost,
        },
      },
    }).json();
 
   return rawPost as Post; 
    
    // insert ref into db

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
