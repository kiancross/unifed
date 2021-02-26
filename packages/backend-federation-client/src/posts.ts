/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { Post, User, extractPostBody } from "@unifed/backend-core";
import { FederationHttpClient } from "./http-client";

const processPost = (rawPost: unknown, host: string): Post => {
  let body, contentType;

  try {
    const extracted = extractPostBody(rawPost);

    if (!extracted) {
      throw new Error();
    }

    contentType = extracted[0];
    body = extracted[1];
  } catch (_) {
    throw new Error("Invalid `content` field");
  }

  const post = plainToClass(Post, rawPost as Post);

  post.body = body;
  post.contentType = contentType;
  post.host = host;

  return post;
};

@Service()
export class PostsFederationService {
  async create(
    host: string,
    user: User,
    community: string,
    title: string,
    body: string,
    parentPost?: string,
  ): Promise<Post | null> {
    const httpClient = new FederationHttpClient(host);

    try {
      const rawPost: Post = await httpClient.post("posts", {
        json: {
          community,
          parentPost,
          title,
          body,
          contentType: "markdown",
          author: user.username,
        },
      });

      const post = plainToClass(Post, rawPost);
      post.host = host;

      return post;
    } catch (error) {
      if (error.response.statusCode === 400) {
        return null;
      } else {
        throw error;
      }
    }
  }

  async getByCommunity(host: string, community: string): Promise<Post[]> {
    const httpClient = new FederationHttpClient(host);

    const rawPosts: Post[] = await httpClient.get("posts", {
      searchParams: {
        community,
      },
    });

    const posts = plainToClass(Post, rawPosts);
    posts.forEach((element) => (element.host = host));
    posts.forEach((element) => {
      if (element.approved === undefined) {
        element.approved = true;
      }
    });

    return posts;
  }

  async getById(host: string, id: string): Promise<Post> {
    const httpClient = new FederationHttpClient(host);

    const rawPost = await httpClient.get(["posts", id]);

    return post;
  }

  async delete(host: string, id: string): Promise<void> {
    const httpClient = new FederationHttpClient(host);

    await httpClient.delete(["posts", id]);
  }

  async update(host: string, id: string, body: string, title?: string): Promise<Post> {
    const httpClient = new FederationHttpClient(host);

    const rawPost = await httpClient.put(["posts", id], {
      json: {
        title: title || null,
        body,
      },
    });

    const post = plainToClass(Post, rawPost);
    post.host = host;

    return post;
  }
}
