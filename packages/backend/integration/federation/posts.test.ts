/*
 * CS3099 Group A3
 */

import { expect } from "chai";
import got from "got";

it("posts", async () => {
  const resp = await got("https://google.com");
  expect(resp.statusCode).to.equal(200);
});
