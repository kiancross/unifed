/*
 * CS3099 Group A3
 */

import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import { routes as apiRoutes } from "./api";
import { mongoUsername, mongoPassword, mongoHostname, mongoPort, mongoDatabase} from "./utils/config";

(async () => {
  const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  const mongoUri = `mongodb://${mongoUsername}:${mongoPassword}@` +
    `${mongoHostname}:${mongoPort}/${mongoDatabase}`;

  await mongoose.connect(mongoUri, mongoOptions);

  const app = express();
  app.use("/", await apiRoutes);
  const serverPort = 8080;
  app.listen(serverPort, () => console.log(`Server running on http://localhost:${serverPort}`));
})();
