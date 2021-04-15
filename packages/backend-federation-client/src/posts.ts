/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Post, extractPostBody, getValidationMessage } from "@unifed/backend-core";
import { FederationHttpClient } from "./http-client";
import { RemoteResponseError } from "./helpers";

/**
 * Type containing properties needed to create a post.
 *
 * @internal
 */
export type CreatePostProps = Pick<Post, "community" | "body" | "parentPost" | "title">;

/**
 * Type containing properties needed to update a post.
 *
 * @internal
 */
export type UpdatePostProps = Omit<CreatePostProps, "parentPost" | "community"> & Pick<Post, "id">;

/**
 * Processes a raw post type (received from a server)
 * and returns a [[`Post`]].
 *
 * @param rawPost The raw, unvalidated post from the server.
 *
 * @param host  The host which returned the post.
 *
 * @returns The validated [[`Post`]].
 *
 * @internal
 */
async function processRawPost(rawPost: unknown, host: string): Promise<Post> {
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
}

/**
 * Service used for interacting with
 * [posts](https://kiancross.github.io/cs3099a-specification/#tag/Posts)
 * on a federated host.
 */
@Service()
export class PostsFederationService {
  /**
   * Creates a new post.
   *
   * @param username  The username of the user creating the post.
   * @param host  The host on which to create the post.
   *
   * @returns The created post.
   */
  async create(username: string, host: string, post: CreatePostProps): Promise<Post> {
    const httpClient = new FederationHttpClient(host, username);

    try {
      const rawPost: Post = await httpClient.post("posts", {
        json: {
          ...post,
          body: undefined,
          content: [
            // See federation protocol for why we have to
            // do this...
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
      if (error.response && error.response.statusCode === 400) {
        throw new RemoteResponseError("Invalid permissions");
      } else {
        throw new RemoteResponseError("Unknown error");
      }
    }
  }

  /**
   * Gets all the posts in a community.
   *
   * @param username  The username of the user getting the post.
   * @param host  The host from which to get the posts.
   * @param community ID of the community to obtain the posts from.
   *
   * @returns All posts in the community.
   */
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

  /**
   * Gets a post by its ID.
   *
   * @param username  The username of the user getting the post.
   * @param host  The host from which to get the post.
   * @param id  The ID of the post to get.
   *
   * @returns The obtained [[`Post`]].
   */
  async getById(username: string, host: string, id: string): Promise<Post> {
    const httpClient = new FederationHttpClient(host, username);

    const rawPost = await httpClient.get(["posts", id]);

    return await processRawPost(rawPost, host);
  }

  /**
   * Deletes a post by its ID.
   *
   * @param username  The username of the user deleting the post.
   * @param host  The host from which to delete the post.
   * @param id  The ID of the post to delete.
   *
   */
  async delete(username: string, host: string, id: string): Promise<void> {
    const httpClient = new FederationHttpClient(host, username);

    await httpClient.delete(["posts", id]);
  }

  /**
   * Updates a post by its ID.
   *
   * @param username  The username of the user deleting the post.
   * @param host  The host on which to update the post.
   * @param id  The ID of the post to update.
   *
   * @returns The updated [[`Post`]].
   */
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
