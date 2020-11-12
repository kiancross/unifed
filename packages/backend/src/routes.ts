/*
 * CS3099 Group A3
 */

import { Router } from "express";
import { routes as graphqlRoutes } from "./graphql-server";
import { routes as federatedRoutes } from "./federated-server";

export const routes = (async (): Promise<Router> => {
  const router: Router = Router();
  router.use("/internal", await graphqlRoutes);
  router.use("/fed", await federatedRoutes);
  return router;
})();
