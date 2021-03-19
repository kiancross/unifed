/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Post, extractPostBody, getValidationMessage } from "@unifed/backend-core";
import { FederationHttpClient } from "./http-client";
import { RemoteResponseError } from "./helpers";

type CreatePostProps = Pick<Post, "community" | "body" | "parentPost" | "title">;
type UpdatePostProps = Omit<CreatePostProps, "parentPost" | "community"> & Pick<Post, "id">;

const processRawPost = async (rawPost: unknown, host: string): Promise<Post> => {
  const post = plainToClass(Post, rawPost as Post);

  post.host = host;

  const { contentType, body } = extractPostBody(rawPost);

  post.contentType = contentType;
  post.body = body;

  if (post.approved === undefined) {
    post.approved = true;
  }

  const validationMessage = getValidationMessage(await validate(post));

  if (validationMessage) {
    throw new Error(validationMessage);
  }

  return post;
};

@Service()
export class PostsFederationService {
  async create(username: string, host: string, post: CreatePostProps): Promise<Post | null> {
    const httpClient = new FederationHttpClient(host, username);

    try {
      const rawPost: Post = await httpClient.post("posts", {
        json: {
          ...post,
          body: undefined,
          content: [
            {
              markdown: {
                markdown: post.body,
              },
            },
          ],
        },
      });

      return await processRawPost(rawPost, host);
    } catch (error) {
      if (error.response.statusCode === 400) {
        throw new RemoteResponseError("Invalid permissions");
      } else {
        throw new RemoteResponseError("Unknown error");
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

    const posts = rawPosts.map((rawPost) => processRawPost(rawPost, host));

    return Promise.all(posts);
  }

  async getById(username: string, host: string, id: string): Promise<Post> {
    const httpClient = new FederationHttpClient(host, username);

    const rawPost = await httpClient.get(["posts", id]);

    return await processRawPost(rawPost, host);
  }

  async delete(username: string, host: string, id: string): Promise<void> {
    const httpClient = new FederationHttpClient(host, username);

    await httpClient.delete(["posts", id]);
  }

  async update(username: string, host: string, post: UpdatePostProps): Promise<Post> {
    const httpClient = new FederationHttpClient(host, username);

    const rawPost = await httpClient.put(["posts", post.id], {
      json: {
        title: post.title || null,
        content: [
          {
            markdown: {
              markdown: post.body,
            },
          },
        ],
      },
    });

    return await processRawPost(rawPost, host);
  }
}
