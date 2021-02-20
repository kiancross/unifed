/*
 * CS3099 Group A3
 */

import "reflect-metadata";
import http from "http";
import express from "express";
import mongoose from "mongoose";
import { config, logger } from "@unifed/backend-core";
import { server as serverPromise } from "./server";

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoUri =
  `mongodb://${config.mongoUsername}:${config.mongoPassword}@` +
  `${config.mongoHostname}:${config.mongoPort}/${config.mongoDatabase}`;

(async () => {
  await mongoose.connect(mongoUri, mongoOptions);

  logger.info("Connected to database");

  const app = express();
  const httpServer = http.createServer(app);
  const server = await serverPromise;

  server.applyMiddleware({ app, path: "/" });
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(config.serverPort, () => {
    console.log(`Server ready at ${config.siteProtocol}://${config.siteHost}${server.graphqlPath}`);
    console.log(`Subscriptions ready at ws://${config.siteHost}${server.subscriptionsPath}`);
  });
})();
