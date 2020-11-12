/*
 * CS3099 Group A3
 */

import { expect } from "chai";
import { dateToUnixTimestamp } from "./date";

describe("dateToUnixTimestamp", () => {
  it("Example 1", () => {
    expect(dateToUnixTimestamp(new Date("2020-11-10T19:34:53+00:00"))).to.equal(1605036893);
  });

  it("Example 2", () => {
    expect(dateToUnixTimestamp(new Date("2017-09-10T09:48:13+00:00"))).to.equal(1505036893);
  });
});
