/*
 * CS3099 Group A3
 */

import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import routes from "./api/routes";
import * as config from "./utils/config";

(async () => {
  const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  const mongoUri =
    `mongodb://${config.mongoUsername}:${config.mongoPassword}@` +
    `${config.mongoHostname}:${config.mongoPort}/${config.mongoDatabase}`;

  await mongoose.connect(mongoUri, mongoOptions);

  const app = express();

  /* istanbul ignore next */
  if (global.__coverage__) {
    app.get("/internal/__coverage__", (_, res) => {
      res.json({ coverage: global.__coverage__ });
    });
  }

  app.use("/", await routes);
  const serverPort = 8080;
  app.listen(serverPort, () => console.log(`Server running on http://localhost:${serverPort}`));
})();
