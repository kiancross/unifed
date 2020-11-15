/*
 * CS3099 Group A3
 */

import test from "ava";
import got from "got";

test("coverage", async (t) => {
  const resp = await got("http://localhost:8080/internal/__coverage__");
  t.is(resp.statusCode, 200);
});
