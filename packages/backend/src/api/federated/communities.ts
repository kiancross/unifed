/*
 * CS3099 Group A3
 */

import { Response, Request, NextFunction } from "express";
import { AsyncRouter } from "express-async-router";
import { CommunityModel } from "../../models";

// integration tests run two instances against each other

async function getCommunity(req: Request, res: Response, next: NextFunction) {

  const community = await CommunityModel.findById(req.params.id);

  if (community === null) {

    res.status(404).json({
      error: "Community not found"
    });

  } else {
    res.locals.community = community;
    next();
  }
}

const router = AsyncRouter();

router.get("/", async (_, res) => {
  res.json(await CommunityModel.find());
});

router.get("/:id", getCommunity, (_, res) => {
  res.json(res.locals.community);
});

router.get("/:id/timestamps", getCommunity, (_, res) => {
  res.json(true);
});

export { router as routes };
