/*
 * CS3099 Group A3
 */

import { Router } from "express";
import { routes as communityRoutes } from "./communities";
import { routes as postRoutes } from "./posts";
import { routes as userRoutes } from "./users";

const router: Router = Router();

router.use("/communities", communityRoutes);
router.use("/posts", postRoutes);
router.use("/users", userRoutes);

export const routes = router;
