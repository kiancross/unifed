/*
 * CS3099 Group A3
 */

import { AsyncRouter } from "express-async-router";
import { ResponseError } from "./response-error";

const router = AsyncRouter();

router.get("/", () => {
  throw new ResponseError(501, "Not implemented");
});

export { router as routes };
