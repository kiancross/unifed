/*
 * CS3099 Group A3
 */

import { Response, Request, NextFunction } from "express";
import { AsyncRouter } from "express-async-router";
import { DocumentType, isDocumentArray } from "@typegoose/typegoose";
import { Community, CommunityModel, Post } from "@unifed/backend-core";
import { sendError } from "./error";

interface CustomLocals {
  community: DocumentType<Community>;
}

interface CustomResponse extends Response {
  locals: CustomLocals;
}

async function getCommunity(req: Request, res: CustomResponse, next: NextFunction) {
  const community = await CommunityModel.findById(req.params.id);

  if (community === null) {
    sendError(res, 404, `Community not found: '${req.params.id}'`);
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
  await res.locals.community.populate("posts").execPopulate();

  if (isDocumentArray(res.locals.community.posts)) {
    res.json(
      res.locals.community.posts.map((post: Post) => {
        return {
          id: post.id,
          modified: post.updatedAtUnixTimestamp,
        };
      }),
    );
  } else {
    sendError(res, 500, "Unable to populate posts from database");
  }
});

export { router as routes };
