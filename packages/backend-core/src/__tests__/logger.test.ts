/*
 * CS3099 Group A3
 */

process.env.UNIFED_LOGGING_LEVEL = "warn";

import test from "ava";
import { logger } from "../logger";

test("Correct level", (t) => {
  t.is(logger.level, "warn");
});
