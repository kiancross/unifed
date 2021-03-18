/*
 * CS3099 Group A3
 */

import { Post } from "./models";

type PostContent = Pick<Post, "body" | "contentType">;
type WithContent = Record<string, unknown> & { content: unknown };

const hasContent = (post: unknown): post is WithContent => {
  return (post as WithContent).content !== undefined;
};

export class InvalidPostBodyError extends Error {}

export const extractPostBody = (post: unknown): PostContent => {
  if (!hasContent(post)) {
    throw new InvalidPostBodyError();
  }

  if (!Array.isArray(post.content)) {
    throw new InvalidPostBodyError();
  }

  for (const contentEntry of post.content) {
    const keys = Object.keys(contentEntry);

    if (keys.length !== 1) {
      throw new InvalidPostBodyError();
    }

    const type = keys[0];

    if ((type === "markdown" || type === "text") && contentEntry[type][type]) {
      return {
        contentType: type,
        body: contentEntry[type][type],
      };
    }
  }

  throw new InvalidPostBodyError();
};
