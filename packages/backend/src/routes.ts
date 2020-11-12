/*
 * CS3099 Group A3
 */

import { Router } from "express";
import { routes as internalRoutes } from "./internal";
import { routes as federatedRoutes } from "./federated-server";

export const routes = (async (): Promise<Router> => {
  const router: Router = Router();
  router.use("/internal", await internalRoutes);
  router.use("/fed", await federatedRoutes);
  return router;
})();
