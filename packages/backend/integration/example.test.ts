/*
 * CS3099 Group A3
 */

import got from "got";

test("posts", async (done) => {
  const resp = await got("https://google.com");
  expect(resp.statusCode).toBe(200);
  done();
});
