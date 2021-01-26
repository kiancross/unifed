/*
 * CS3099 Group A3
 */

import test from "ava";
import { getSpamFactor } from "../index";

test("Spam detection", async (t) => {
  const factor = await getSpamFactor("Test sentence");

  t.true(factor >= 0);
  t.true(factor <= 1);
});
