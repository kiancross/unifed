/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Post, extractPostBody, getValidationMessage } from "@unifed/backend-core";
import { FederationHttpClient } from "./http-client";

const processPost = async (rawPost: unknown, host: string): Promise<Post> => {
  const post = plainToClass(Post, rawPost as Post);

  post.host = host;

  try {
    const extracted = extractPostBody(rawPost);

    if (!extracted) {
      throw new Error();
    }

    post.contentType = extracted[0];
    post.body = extracted[1];
  } catch (_) {
    throw new Error("Invalid `content` field");
  }

  if (post.approved === undefined) {
    post.approved = true;
  }

  const validationMessage = getValidationMessage(await validate(post));

  console.log(post);

  if (validationMessage) {
    throw new Error(validationMessage);
  }

  return post;
};

@Service()
export class PostsFederationService {
  async create(
    username: string,
    host: string,
    community: string,
    title: string,
    body: string,
    parentPost?: string,
  ): Promise<Post | null> {
    const httpClient = new FederationHttpClient(host, username);

    try {
      const rawPost: Post = await httpClient.post("posts", {
        json: {
          community,
          parentPost,
          title,
          content: [
            {
              markdown: {
                markdown: body,
              },
            },
          ],
        },
      });

      return await processPost(rawPost, host);
    } catch (error) {
      if (error.response.statusCode === 400) {
        return null;
      } else {
        throw error;
      }
    }
  }

  async getByCommunity(username: string, host: string, community: string): Promise<Post[]> {
    const httpClient = new FederationHttpClient(host, username);

    const rawPosts = await httpClient.get("posts", {
      searchParams: {
        community,
      },
    });

    if (!Array.isArray(rawPosts)) {
      throw new Error();
    }

    const posts = rawPosts.map((rawPost) => processPost(rawPost, host));

    return Promise.all(posts);
  }

  async getById(username: string, host: string, id: string): Promise<Post> {
    const httpClient = new FederationHttpClient(host, username);

    const rawPost = await httpClient.get(["posts", id]);

    return await processPost(rawPost, host);
  }

  async delete(username: string, host: string, id: string): Promise<void> {
    const httpClient = new FederationHttpClient(host, username);

    await httpClient.delete(["posts", id]);
  }

  async update(
    username: string,
    host: string,
    id: string,
    body: string,
    title?: string,
  ): Promise<Post> {
    const httpClient = new FederationHttpClient(host, username);

    const rawPost = await httpClient.put(["posts", id], {
      json: {
        title: title || null,
        content: [
          {
            markdown: {
              markdown: body,
            },
          },
        ],
      },
    });

    return await processPost(rawPost, host);
  }
}
