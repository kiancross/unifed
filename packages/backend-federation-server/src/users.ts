/*
 * CS3099 Group A3
 */

import escapeStringRegexp from "escape-string-regexp";
import { AsyncRouter } from "express-async-router";
import { UserModel } from "@unifed/backend-core";
import { processParam } from "./helpers";
import { ResponseError } from "./response-error";

const router = AsyncRouter();

router.get("/", async (req, res) => {
  const prefix =
    (await processParam(req.query, "prefix", (value) => escapeStringRegexp(value))) || "";

  const communities = await UserModel.find({
    username: {
      $regex: "^" + prefix,
    },
  });

  res.json(communities.map((community) => community.username));
});

router.get("/:id", () => {
  throw new ResponseError(501, "Not implemented");
});

router.post("/:id", () => {
  throw new ResponseError(501, "Not implemented");
});

export { router as routes };
