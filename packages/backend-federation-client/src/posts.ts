/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { Post, User } from "@unifed/backend-core";
import { FederationHttpClient } from "./http-client";

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

    return posts;
  }

  async getById(host: string, id: string): Promise<Post> {
    const httpClient = new FederationHttpClient(host);

    const rawPost: Post = await httpClient.get(["posts", id]);

    const post = plainToClass(Post, rawPost);
    post.host = host;

    return post;
  }

  async delete(host: string, id: string): Promise<void> {
    const httpClient = new FederationHttpClient(host);

    await httpClient.delete(["posts", id]);
  }

  async update(host: string, id: string, title: string, body: string): Promise<void> {
    const httpClient = new FederationHttpClient(host);

    await httpClient.put(["posts", id], {
      json: {
        title,
        body,
      },
    });
  }
}
