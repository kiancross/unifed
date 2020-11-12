/*
 * CS3099 Group A3
 */

import got from "got";
import { plainToClass } from "class-transformer";
import { getFederatedApiEndpoint } from "./utils";
import { Post, User } from "../../models";
import { config } from "../../utils";

export async function createPost(
  host: string,
  user: User,
  parent: string,
  title: string,
  body: string,
) {
  try {
    const rawPost = await got
      .post(getFederatedApiEndpoint(host, ["posts"]), {
        json: {
          parent,
          title,
          body,
          contentType: "markdown",
          author: {
            id: user.username,
            host: config.siteHost,
          },
        },
      })
      .json();

    const post = plainToClass(Post, rawPost as Post);
    post.host = host;

    return post;

    // insert ref into db
  } catch (error) {
    if (error.response.statusCode === 400) {
      return null;
    } else {
      throw error;
    }
  }
}

export async function getPosts(host: string, community: string): Promise<Post[]> {
  const rawPosts = await got(getFederatedApiEndpoint(host, ["posts"]), {
    searchParams: {
      community,
    },
  }).json();

  const posts = plainToClass(Post, rawPosts as Post[]);
  posts.forEach((element) => (element.host = host));

  return posts;
}

export async function getPost(host: string, id: string): Promise<Post> {
  const rawPost = await got(getFederatedApiEndpoint(host, ["posts", id])).json();

  const post = plainToClass(Post, rawPost as Post);
  post.host = host;

  return post;
}
