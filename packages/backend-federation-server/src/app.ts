/*
 * CS3099 Group A3
 */

import express from "express";
import { logger } from "@unifed/backend-core";
import { routes } from "./routes";

export const app = express();

app.use(function (req, _, next) {
  logger.debug(`Received request: ${req.path}`);
  next();
});

app.use("/", routes);
