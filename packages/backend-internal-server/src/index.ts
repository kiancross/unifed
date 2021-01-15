/*
 * CS3099 Group A3
 */

import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import { config, logger } from "@unifed/backend-core";
import { routes } from "./routes";

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoUri =
  `mongodb://${config.mongoUsername}:${config.mongoPassword}@` +
  `${config.mongoHostname}:${config.mongoPort}/${config.mongoDatabase}`;

(async () => {
  await mongoose.connect(mongoUri, mongoOptions);

  logger.info("Connected to database");

  const app = express();

  app.use("/", await routes);

  app.listen(config.serverPort, () =>
    logger.info(`Server running on http://localhost:${config.serverPort}`),
  );
})();
