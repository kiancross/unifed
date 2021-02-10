/*
 * CS3099 Group A3
 */

import { plainToClass } from "class-transformer";
import { DocumentType } from "@typegoose/typegoose";
import { Response, Request, NextFunction, json as jsonBodyParser } from "express";
import { AsyncRouter } from "express-async-router";
import { Post, PostModel } from "@unifed/backend-core";

interface Locals {
  post: DocumentType<Post>;
}

interface CustomResponse extends Response {
  locals: Locals;
}

async function getPost(req: Request, res: CustomResponse, next: NextFunction) {
  const post = await PostModel.findById(req.params.id);

  if (post === null) {
    res.status(404).json({
      error: `Post not found: '${req.params.id}'`,
    });
  } else {
    res.locals.post = post;
    next();
  }
}

const router = AsyncRouter();

router.use(jsonBodyParser());

router.get("/", async (req, res) => {
  const limit = typeof req.query.limit === "string" ? Number(req.query.limit) : 0;
  const minDate = typeof req.query.minDate === "string" ? Number(req.query.minDate) : null;

  if (isNaN(limit) || limit < 0) {
    res.status(400).json({ error: "If 'limit' is set it must be a positive number" });
    return;
  }

  if (minDate !== null && (isNaN(minDate) || minDate < 0)) {
    res.status(400).json({ error: "If 'minDate' is set it must be a number (unix timestamp)" });
    return;
  }

  const filter: any = {};

  if (req.query.community !== undefined) {
    filter.community = req.query.community;
  }

  if (minDate) {
    filter.createdAt = {
      $gte: new Date(minDate * 1000).toISOString(),
    };
  }

  res.json(
    await PostModel.find(filter)
      .limit(limit || 0)
      .populate("children")
      .sort("createdAt"),
  );
});

router.post("/", async (req, res) => {
  const rawPost = req.body;
  rawPost.author = { id: rawPost.author, host: req.get("client-host") };

  const post = plainToClass(Post, rawPost as Post);

  // TODO validate

  res.json(await PostModel.create(post));
});

router.get("/:id", getPost, async (_, res) => {
  res.json(await res.locals.post.populate("children").execPopulate());
});

router.put("/:id", getPost, async (req, res) => {
  // TODO Check user

  res.locals.post.title = req.body.title;
  res.locals.post.body = req.body.body;

  await res.locals.post.save();
});

router.delete("/:id", getPost, async (_, res) => {
  // TODO Check user
  await res.locals.post.deleteOne();
});

export { router as routes };
