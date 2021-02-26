/*
 * CS3099 Group A3
 */

import { AsyncRouter } from "express-async-router";
import { isDocumentArray } from "@typegoose/typegoose";
import { CommunityModel, Post } from "@unifed/backend-core";
import { getCommunityOrThrow } from "./helpers";
import { ResponseError } from "./response-error";

const router = AsyncRouter();

router.get("/", async (_, res) => {
  const communities = await CommunityModel.find();
  res.json(communities.map((community) => community.id));
});

router.get("/:id", async (req, res) => {
  const community = await getCommunityOrThrow(req.params.id, 404);
  res.json(community);
});

router.get("/:id/timestamps", async (req, res) => {
  const community = await getCommunityOrThrow(req.params.id, 404);

  await community.populate("posts").execPopulate();

  if (isDocumentArray(community.posts)) {
    res.json(
      community.posts.map((post: Post) => {
        return {
          id: post.id,
          modified: post.modified,
        };
      }),
    );
  } else {
    throw new ResponseError(500, "Unable to populate posts from database");
  }
});

export { router as routes };
