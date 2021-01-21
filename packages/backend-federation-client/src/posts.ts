/*
 * CS3099 Group A3
 */

import got from "got";
import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { getFederatedApiEndpoint } from "./helpers";
import { Post, User } from "@unifed/backend-core";

@Service()
export class PostsService {
  async create(host: string, user: User, parent: string, title: string, body: string) {
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
              host: host,
            },
          },
        })
        .json();

      const post = plainToClass(Post, rawPost as Post);
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
    const rawPosts = await got(getFederatedApiEndpoint(host, ["posts"]), {
      searchParams: {
        community,
      },
    }).json();

    const posts = plainToClass(Post, rawPosts as Post[]);
    posts.forEach((element) => (element.host = host));

    return posts;
  }

  async getById(host: string, id: string): Promise<Post> {
    const rawPost = await got(getFederatedApiEndpoint(host, ["posts", id])).json();

    const post = plainToClass(Post, rawPost as Post);
    post.host = host;

    return post;
  }

  async delete(host: string, id: string): Promise<void> {
    await got.delete(getFederatedApiEndpoint(host, ["posts", id]));
  }
}
