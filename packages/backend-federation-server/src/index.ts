/*
 * CS3099 Group A3
 */

import mongoose from "mongoose";
import { config, logger } from "@unifed/backend-core";
import { app } from "./app";

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoUri =
  `mongodb://${config.mongoUsername}:${config.mongoPassword}@` +
  `${config.mongoHostname}:${config.mongoPort}/${config.mongoDatabase}`;

(async () => {
  await mongoose.connect(mongoUri, mongoOptions);

  logger.info("Connected to database");

  app.listen(config.serverPort, () =>
    logger.info(`Server running on http://localhost:${config.serverPort}`),
  );
})();
