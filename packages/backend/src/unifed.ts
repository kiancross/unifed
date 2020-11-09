/*
 * CS3099 Group A3
 */

import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes";
import { config } from "./utils";

(async () => {
  const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  const mongoUri =
    `mongodb://${config.mongoUsername}:${config.mongoPassword}@` +
    `${config.mongoHostname}:${config.mongoPort}/${config.mongoDatabase}`;

  await mongoose.connect(mongoUri, mongoOptions);

  const app = express();
  app.use("/", await routes);
  const serverPort = 8080;
  app.listen(serverPort, () => console.log(`Server running on http://localhost:${serverPort}`));
})();
