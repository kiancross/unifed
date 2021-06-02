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
