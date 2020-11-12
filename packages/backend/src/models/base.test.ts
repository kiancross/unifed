/*
 * CS3099 Group A3
 */

import { expect } from "chai";
import { Base, UnrecognisedPropertyError, getIdFromRef } from "./base";

class MockBase extends Base { }

describe("Base", () => {

  let base: MockBase;

  beforeEach(() => {
    base = new MockBase();
  });

  it("id getter", () => {
    expect(base.id).to.be.undefined;
  });

  it("id setter", () => {
    base.id = "someid";
    expect(base.id).to.equal("someid");
  });

  it("toJSON", () => {
    base.id = "someid";
    expect(base.toJSON()).to.deep.equal({id: "someid"})
  })
});

describe("getIdFromRef", () => {
  it("isRefType", () => {
    expect(getIdFromRef("someid")).to.equal("someid");
  });
});

it("UnrecognisedPropertyError", () => {
  const error = new UnrecognisedPropertyError("someprop");
  expect(error.message).to.contain("someprop");
  expect(error.message).to.contain(typeof "someprop");
})
