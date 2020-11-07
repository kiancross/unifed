/*
 * CS3099 Group A3
 */

import { Response, Request, NextFunction } from "express";
import { AsyncRouter } from "express-async-router";
import { PostModel } from "../../models";

async function getPost(req: Request, res: Response, next: NextFunction) {

  const post = await PostModel.findById(req.params.id);

  if (post === null) {

    res.status(404).json({
      error: "Post not found"
    });

  } else {
    res.locals.post = post;
    next();
  }
}

const router = AsyncRouter();

// limit - int
// community - str
// min_date - unix timestamp
router.get("/", async (req, res) => {

  const filter: any = {};

  if (req.query.community !== undefined) {
    filter.parent = req.query.community
  }

  const limit = typeof req.query.limit === "string" ? Number(req.query.limit) : 0;

  if (isNaN(limit)) {
    res.status(400).json({error: "If 'limit' is set it must be a number"});
    return;
  }

  res.json(await PostModel.find(filter).limit(limit || 0).sort("createdAt"));
});

router.post("/", (/*req, res*/) => {

});

router.get("/:id", getPost, (_, res) => {
  res.json(res.locals.post);
});

router.put("/:id", getPost, (/*req, res*/) => {
  //update
});

router.delete("/:id", getPost, (/*req, res*/) => {
  //new
});

export { router as routes };
