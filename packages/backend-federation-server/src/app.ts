/*
 * CS3099 Group A3
 */

import express from "express";
import { logger } from "@unifed/backend-core";
import { ErrorRequestHandler } from "express";
import { routes } from "./routes";
import { ResponseError } from "./response-error";

/**
 * The main entry point of the application.
 *
 * An Express application which hosts the HTTP
 * server.
 *
 * @internal
 */
export const app = express();

app.use((req, _, next) => {
  logger.debug(`Received request: ${req.method} ${req.path} ${JSON.stringify(req.query)}`);
  next();
});

app.use("/", routes);

app.use(((err, _, res, next) => {
  // Return a JSON error for ResponseErrors.
  if (err instanceof ResponseError) {
    res.status(err.code).json({
      title: err.title,
      message: err.message,
    });
  } else {
    next(err);
  }
}) as ErrorRequestHandler);
