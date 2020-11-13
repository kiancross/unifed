/*
 * CS3099 Group A3
 */

import { expect } from "chai";
import { logger } from "../logging";

it("Not silent", () => {
  expect(logger.silent).to.be.false;
});
