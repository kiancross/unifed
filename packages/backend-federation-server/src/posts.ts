/*
 * CS3099 Group A3
 */

import { plainToClass } from "class-transformer";
import { json as jsonBodyParser } from "express";
import { AsyncRouter } from "express-async-router";
import { Post, PostModel } from "@unifed/backend-core";
import { getCommunityOrThrow, getPostOrThrow, processParam, ParamError } from "./helpers";

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
  const host = await processParam(req.query, "host", async (value) => value);

  // TODO parentPost and contentType

  res.json(
    await PostModel.find({
      community,
      "author.id": author,
      "author.host": host, // TODO
      createdAt: {
        $gte: minDate,
      },
    })
      .limit(limit)
      .populate("children")
      .sort("createdAt"),
  );
});

router.post("/", async (req, res) => {
  const rawPost = req.body;
  rawPost.author = { id: req.body.author, host: req.get("client-host") };

  const post = plainToClass(Post, rawPost as Post);

  // TODO validate

  res.json(await PostModel.create(post));
});

router.get("/:id", async (req, res) => {
  const post = await getPostOrThrow(req.params.id, 404);
  res.json(await post.populate("children").execPopulate());
});

router.put("/:id", async (req) => {
  const post = await getPostOrThrow(req.params.id, 404);

  // TODO validate

  post.title = req.body.title;
  post.body = req.body.body;

  await post.save();
});

router.delete("/:id", async (req) => {
  const post = await getPostOrThrow(req.params.id, 404);

  // TODO validate

  await post.deleteOne();
});

export { router as routes };
