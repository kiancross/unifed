/*
 * Copyright (C) 2020 Kian Cross
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { AsyncRouter } from "express-async-router";
import { isDocumentArray } from "@typegoose/typegoose";
import { CommunityModel, Post } from "@unifed/backend-core";
import { getCommunityOrThrow } from "./helpers";
import { ResponseError } from "./response-error";

const router = AsyncRouter();

/*
 * Serves all communities.
 */
router.get("/", async (_, res) => {
  const communities = await CommunityModel.find();
  res.json(communities.map((community) => community.id));
});

/*
 * Serves a community by its ID.
 */
router.get("/:id", async (req, res) => {
  const community = await getCommunityOrThrow(req.params.id, 404);
  res.json(community);
});

/*
 * Returns the last modified timestamps for all posts on a
 * community.
 */
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
    // Sanity check! This should never happen...
    throw new ResponseError(500, "Unable to populate posts from database");
  }
});

export { router as routes };
