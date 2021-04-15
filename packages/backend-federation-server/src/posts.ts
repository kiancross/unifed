/*
 * CS3099 Group A3
 */

import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { json as jsonBodyParser, Request } from "express";
import { AsyncRouter } from "express-async-router";

import {
  Post,
  PostModel,
  extractPostBody,
  getIdFromRef,
  normaliseHost,
  InvalidPostBodyTypeError,
  InvalidPostBodyFormatError,
} from "@unifed/backend-core";

import { getSpamFactor, getToxicityClassification } from "@unifed/backend-ml";
import { ResponseError } from "./response-error";

import {
  getCommunityOrThrow,
  getPostOrThrow,
  processParam,
  throwValidationError,
  ParamError,
} from "./helpers";

/**
 * Extracts the body from a post or throws an error if
 * the body is of an invalid format.
 *
 * @param post The post to extract the body from.
 *
 * @returns The extracted post body.
 *
 * @internal
 */
const extractPostBodyOrThrow = (
  post: Record<string, unknown>,
): ReturnType<typeof extractPostBody> => {
  try {
    return extractPostBody(post);
  } catch (error) {
    if (error instanceof InvalidPostBodyFormatError) {
      // 400 errors are thrown if it is malformed.
      throw new ResponseError(400, "Invalid content field");
    } else if (error instanceof InvalidPostBodyTypeError) {
      // 501 errors are thrown if they pass a type that we do not
      // support.
      throw new ResponseError(501, "Only `markdown` and `text` types are supported");
    } else {
      throw error;
    }
  }
};

/**
 * Throws an error if the user does not have the correct
 * permissions to perform an action.
 *
 * @param username  The username of the user making the request.
 * @param host  The host of the user making the request.
 *
 * @internal
 */
async function throwIfWrongPermissions(
  { author, community }: Post,
  username?: string,
  host?: string,
): Promise<void> {
  const communityId = getIdFromRef(community);

  if (!host) {
    throw new ResponseError(400, "Host not found");
  }

  if (!communityId) {
    throw new ResponseError(400, "Community not found");
  }

  const retrievedCommunity = await getCommunityOrThrow(communityId, 400);

  // Check if the user is an administrator. If they are,
  // they have the correct permissions.
  for (const admin of retrievedCommunity.admins) {
    if (username === admin.id && (await normaliseHost(host)) === admin.host) {
      return;
    }
  }

  if (author.id !== username || author.host !== host) {
    throw new ResponseError(403, "Invalid permissions");
  }
}

/**
 * Gets an author's details from a request's headers.
 *
 * @param req  The request.
 *
 * @returns  A tuple with first parameter being the username and
 *           second parameter being the user's host.
 *
 * @internal
 */
function getAuthor(req: Request): [string, string] {
  const username = req.get("user-id");
  const host = req.get("client-host");

  if (!username || !host) {
    throw new ResponseError(403, "User-ID or Client-Host missing");
  }

  return [username, host];
}

/**
 * Processes a post by running it through the spam detection
 * and text toxicity classifier. Marks them as not approved
 * if any component of the post fails the tests.
 *
 * @param post  The post to test.
 *
 * @internal
 */
async function processAndValidatePost(post: Post) {
  const spamThreshold = 0.8;

  const titleSpam = post.title && (await getSpamFactor(post.title)) >= spamThreshold;
  const bodySpam = (await getSpamFactor(post.body)) >= spamThreshold;

  const titleToxic = post.title && (await getToxicityClassification(post.title));
  const bodyToxic = await getToxicityClassification(post.body);

  post.approved = !(titleSpam || bodySpam || titleToxic || bodyToxic);

  throwValidationError(await validate(post));
}

const router = AsyncRouter();

router.use(jsonBodyParser());

/**
 * Get all posts from the system.
 */
router.get("/", async (req, res) => {
  const limit =
    (await processParam(req.query, "limit", (value, name) => {
      const limit = Number(value);

      if (isNaN(limit) || limit <= 0) {
        throw new ParamError(value, name, "must be number greater than 0");
      }

      return limit;
    })) || 0;

  const minDate =
    (await processParam(req.query, "minDate", (value, name) => {
      const minDate = Number(value);

      if (isNaN(minDate) || minDate < 0) {
        throw new ParamError(value, name, "must be number greater than 0 (unix timestamp)");
      }

      return new Date(minDate * 1000);
    })) || new Date(0);

  const community = await processParam(req.query, "community", async (value) => {
    await getCommunityOrThrow(value, 400);
    return value;
  });

  const author = await processParam(req.query, "author", async (value) => value);

  res.json(
    await PostModel.find({
      community,
      "author.id": author,
      createdAt: {
        $gte: minDate,
      },
    })
      .limit(limit)
      .populate("children")
      .sort("createdAt"),
  );
});

/**
 * Get a particular post from the system.
 */
router.get("/:id", async (req, res) => {
  const post = await getPostOrThrow(req.params.id, 404);
  res.json(await post.populate("children").execPopulate());
});

/**
 * Creates a post on the system.
 */
router.post("/", async (req, res) => {
  const rawPost = req.body;

  const [username, host] = getAuthor(req);
  rawPost.author = { _id: username, host };

  const { contentType, body } = extractPostBodyOrThrow(rawPost);

  rawPost.body = body;
  rawPost.contentType = contentType;
  rawPost.content = undefined;

  const post = plainToClass(Post, rawPost as Post);

  await processAndValidatePost(post);

  await getCommunityOrThrow(rawPost.community, 400);

  res.json(await PostModel.create(post));
});

/**
 * Updates a particular post on the system.
 */
router.put("/:id", async (req, res) => {
  const post = await getPostOrThrow(req.params.id, 404);

  const { contentType, body } = extractPostBodyOrThrow(req.body);

  post.title = req.body.title;
  post.body = body;
  post.contentType = contentType;

  const author = getAuthor(req);

  await throwIfWrongPermissions(post, ...author);

  await processAndValidatePost(post);

  await post.save();

  res.json(post);
});

/**
 * Deletes a particular post from the system.
 */
router.delete("/:id", async (req) => {
  const post = await getPostOrThrow(req.params.id, 404);

  const author = getAuthor(req);

  await throwIfWrongPermissions(post, ...author);

  await post.deleteOne();
});

export { router as routes };
