/*
 * CS3099 Group A3
 */

import { expect } from "chai";
import got from "got";

it("coverage", async () => {
  const resp = await got("http://localhost:8080/internal/__coverage__");
  expect(resp.statusCode).to.equal(200);
});
