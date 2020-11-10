/*
 * CS3099 Group A3
 */

import { Response, Request, NextFunction, json as jsonBodyParser } from "express";
import { AsyncRouter } from "express-async-router";
import { PostModel, CommunityModel } from "../models";

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
  const post = req.body;

  const parentPost = await PostModel.findById(post.parent);
  const communityId = parentPost ? parentPost.community : post.parent;

  const community = await CommunityModel.findById(communityId);
  if (!community) {
    res.status(400).json({ error: "Invalid field: 'parent'" });
    return;
  }

  res.json(await PostModel.create({ ...post, community, parentPost }));
});

router.get("/:id", getPost, (_, res) => {
  res.json(res.locals.post);
});

router.put("/:id", getPost, (_, res) => {
  res.status(501);
});

router.delete("/:id", getPost, (_, res) => {
  res.status(501);
});

export { router as routes };