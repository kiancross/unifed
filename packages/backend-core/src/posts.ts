/*
 * CS3099 Group A3
 */

type WithContent = Record<string, unknown> & { content: unknown };

const hasContent = (post: unknown): post is WithContent => {
  return (post as WithContent).content !== undefined;
};

export const extractPostBody = (post: unknown): [string, string] | undefined => {
  if (!hasContent(post)) {
    throw new Error();
  }

  if (!Array.isArray(post.content)) {
    throw new Error();
  }

  for (const contentEntry of post.content) {
    const keys = Object.keys(contentEntry);

    if (keys.length !== 1) {
      throw new Error();
    }

    const type = keys[0];

    if ((type === "markdown" || type === "text") && contentEntry[type][type]) {
      return [type, contentEntry[type][type]];
    }
  }

  return undefined;
};
