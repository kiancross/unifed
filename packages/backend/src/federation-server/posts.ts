/*
 * CS3099 Group A3
 */

import { plainToClass } from "class-transformer";
import { Response, Request, NextFunction, json as jsonBodyParser } from "express";
import { AsyncRouter } from "express-async-router";
import { Post, PostModel, CommunityModel } from "../models";

async function getPost(req: Request, res: Response, next: NextFunction) {
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
  const minDate = typeof req.query.min_date === "string" ? Number(req.query.min_date) : null;

  if (isNaN(limit)) {
    res.status(400).json({ error: "If 'limit' is set it must be a number" });
    return;
  }

  if (minDate !== null && isNaN(minDate)) {
    res.status(400).json({ error: "If 'min_date' is set it must be a number (unix timestamp)" });
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
  const postRaw = req.body;
  const post = plainToClass(Post, postRaw as Post);

  const parentPost = await PostModel.findById(postRaw.parent);

  if (parentPost) {
    post.community = parentPost.community;
    post.parentPost = parentPost;
  } else {
    const community = await CommunityModel.findById(postRaw.parent);

    if (community) {
      post.community = community;
    } else {
      res.status(400).json({ error: "Invalid field: 'parent'" });
      return;
    }
  }

  // TODO validate

  res.json(await PostModel.create(post));
});

router.get("/:id", getPost, async (_, res) => {
  res.json(await res.locals.post.populate("children").execPopulate());
});

router.put("/:id", getPost, (_, res) => {
  res.status(501);
});

router.delete("/:id", getPost, (_, res) => {
  res.status(501);
});

export { router as routes };
