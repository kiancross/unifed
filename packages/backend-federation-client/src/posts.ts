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

  post.body = body;
  post.contentType = contentType;
  post.host = host;

  const validationMessage = getValidationMessage(await validate(post));

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

    const rawPosts: Post[] = await httpClient.get("posts", {
      searchParams: {
        community,
      },
    });

    const posts = plainToClass(Post, rawPosts);

    posts.forEach((element) => {
      element.host = host;
      if (element.approved === undefined) {
        element.approved = true;
      }
    });

    return posts;
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
        body,
      },
    });

    return await processPost(rawPost, host);
  }
}
