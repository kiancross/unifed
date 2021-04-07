/*
 * CS3099 Group A3
 */

import { Post } from "./models";

/**
 * Type used for an object with arbitrary key/value
 * pairs, including one called `content`.
 *
 * @internal
 */
type WithContent = Record<string, unknown> & { content: unknown };

/**
 * Type consisting of the `body` and `contentType`
 * fields from [[`Post`]].
 */
export type PostContent = Pick<Post, "body" | "contentType">;

/**
 * Error thrown if the body of a post has an invalid
 * format.
 */
export class InvalidPostBodyFormatError extends Error {}

/**
 * Error thrown if the body of a post is of an invalid
 * type.
 */
export class InvalidPostBodyTypeError extends Error {}

/**
 * Checks if a given object contains a `content`
 * property.
 *
 * @param post  The object to check.
 *
 * @internal
 */
function hasContent(post: unknown): post is WithContent {
  return (post as WithContent).content !== undefined;
}

/**
 * Extracts the body of a post from a post object,
 * if it exists.
 *
 * Throws a [[`InvalidPostBodyFormatError`]]
 * or [[`InvalidPostBodyTypeError`]] if there are
 * problems during the extraction.
 *
 * @param post  The post object to extract the body from.
 *
 * @returns The post's body and content type.
 */
export function extractPostBody(post: unknown): PostContent {
  if (!hasContent(post)) {
    throw new InvalidPostBodyFormatError();
  }

  if (!Array.isArray(post.content)) {
    throw new InvalidPostBodyFormatError();
  }

  for (const contentEntry of post.content) {
    const keys = Object.keys(contentEntry);

    if (keys.length !== 1) {
      throw new InvalidPostBodyFormatError();
    }

    const type = keys[0];

    if (type === "markdown" || type === "text") {
      // For some reason the federation protocol insists on this
      // nested structure.
      if (contentEntry[type][type]) {
        return {
          contentType: type,
          body: contentEntry[type][type],
        };
      } else {
        throw new InvalidPostBodyFormatError();
      }
    }
  }

  throw new InvalidPostBodyTypeError();
}
