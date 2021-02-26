/*
 * CS3099 Group A3
 */

export const extractPostBody = (post: Record<string, unknown>): [string, string] | undefined => {
  if (!Array.isArray(post.content)) {
    throw new Error();
  }

  for (const contentEntry of post.content) {
    const keys = Object.keys(contentEntry);

    if (keys.length !== 1) {
      throw new Error();
    }

    const type = keys[0];

    if (type === "markdown" || type === "text") {
      return [type, contentEntry[type][type]];
    }
  }

  return undefined;
};
