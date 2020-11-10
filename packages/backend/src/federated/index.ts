/*
 * CS3099 Group A3
 */

import { Router } from "express";
import { routes as communityRoutes } from "./communities";
import { routes as postRoutes } from "./posts";

const router: Router = Router();

router.use("/communities", communityRoutes);
router.use("/posts", postRoutes);

export const routes = router;
