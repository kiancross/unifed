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

const extractPostBodyOrThrow = (
  post: Record<string, unknown>,
): ReturnType<typeof extractPostBody> => {
  try {
    return extractPostBody(post);
  } catch (error) {
    if (error instanceof InvalidPostBodyFormatError) {
      throw new ResponseError(400, "Invalid content field");
    } else if (error instanceof InvalidPostBodyTypeError) {
      throw new ResponseError(501, "Only `markdown` and `text` types are supported");
    } else {
      throw error;
    }
  }
};

const throwIfWrongPermissions = ({ author }: Post, username?: string, host?: string): void => {
  if (author.id !== username || author.host !== host) {
    throw new ResponseError(403, "Invalid permissions");
  }
};

const getAuthor = (req: Request): [string, string] => {
  const username = req.get("user-id");
  const host = req.get("client-host");

  if (!username || !host) {
    throw new ResponseError(403, "User-ID or Client-Host missing");
  }

  return [username, host];
};

const processAndValidatePost = async (post: Post) => {
  const spamThreshold = 0.8;

  const titleSpam = post.title && (await getSpamFactor(post.title)) >= spamThreshold;
  const bodySpam = (await getSpamFactor(post.body)) >= spamThreshold;

  const titleToxic = post.title && (await getToxicityClassification(post.title));
  const bodyToxic = await getToxicityClassification(post.body);

  post.approved = !(titleSpam || bodySpam || titleToxic || bodyToxic);

  throwValidationError(await validate(post));
};

const router = AsyncRouter();

router.use(jsonBodyParser());

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
  //const host = await processParam(req.query, "host", async (value) => value);

  // TODO parentPost and contentType

  res.json(
    await PostModel.find({
      community,
      "author.id": author,
      //"author.host": host, // TODO
      createdAt: {
        $gte: minDate,
      },
    })
      .limit(limit)
      .populate("children")
      .sort("createdAt"),
  );
});

router.get("/:id", async (req, res) => {
  const post = await getPostOrThrow(req.params.id, 404);
  res.json(await post.populate("children").execPopulate());
});

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

router.put("/:id", async (req, res) => {
  const post = await getPostOrThrow(req.params.id, 404);

  const { contentType, body } = extractPostBodyOrThrow(req.body);

  post.title = req.body.title;
  post.body = body;
  post.contentType = contentType;

  const author = getAuthor(req);

  throwIfWrongPermissions(post, ...author);

  await processAndValidatePost(post);

  await post.save();

  res.json(post);
});

router.delete("/:id", async (req) => {
  const post = await getPostOrThrow(req.params.id, 404);

  const author = getAuthor(req);

  throwIfWrongPermissions(post, ...author);

  await post.deleteOne();
});

export { router as routes };
