/*
 * CS3099 Group A3
 */

import express from "express";
import mongoose from "mongoose";
import { config, logger } from "unifed-backend-core";
import { routes } from "./routes";

(async () => {
  const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  const mongoUri =
    `mongodb://${config.mongoUsername}:${config.mongoPassword}@` +
    `${config.mongoHostname}:${config.mongoPort}/${config.mongoDatabase}`;

  await mongoose.connect(mongoUri, mongoOptions);

  logger.info("Connected to database");

  const app = express();

  /* istanbul ignore next */
  if (global.__coverage__) {
    logger.info("Serving coverage report");

    app.get("/internal/__coverage__", (_, res) => {
      res.json({ coverage: global.__coverage__ });
    });
  }

  app.use("/", await routes);
  const serverPort = 8080;
  app.listen(serverPort, () => logger.info(`Server running on http://localhost:${serverPort}`));
})();
