/*
 * CS3099 Group A3
 */

import { Response, Request, NextFunction } from "express";
import { AsyncRouter } from "express-async-router";
import { CommunityModel, Post } from "unifed-backend-models";

async function getCommunity(req: Request, res: Response, next: NextFunction) {
  const community = await CommunityModel.findById(req.params.id);

  if (community === null) {
    res.status(404).json({
      error: `Community not found: '${req.params.id}'`,
    });
  } else {
    res.locals.community = community;
    next();
  }
}

const router = AsyncRouter();

router.get("/", async (_, res) => {
  const communities = await CommunityModel.find();
  res.json(communities.map((community) => community.id));
});

router.get("/:id", getCommunity, (_, res) => {
  res.json(res.locals.community);
});

router.get("/:id/timestamps", getCommunity, async (_, res) => {
  const populatedCommunity = await res.locals.community.populate("posts").execPopulate();

  res.json(
    populatedCommunity.posts?.map((post: Post) => {
      return {
        id: post.id,
        modified: post.updatedAtUnixTimestamp,
      };
    }),
  );
});

export { router as routes };
