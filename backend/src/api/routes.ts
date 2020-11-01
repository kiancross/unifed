/*
 * CS3099 Group A3
 */

import { Router } from "express";
import internalRoutes from "./internal/routes";

export default (async (): Promise<Router> => {
  const router: Router = Router();
  router.use("/internal", await internalRoutes);
  return router;
})();
