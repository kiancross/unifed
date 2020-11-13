/*
 * CS3099 Group A3
 */

import { expect } from "chai";
import { getFederatedApiEndpoint, isStringArray, RemoteResponseError } from "./utils";

describe("RemoteResponseError", () => {
  it("Message", () => {
    const error = new RemoteResponseError("foo");
    expect(error.message).to.match(/foo/);
  });
});

describe("isStringArray", () => {
  it("Empty", () => {
    expect(isStringArray([])).to.be.true;
  });
  
  it("Not array", () => {
    expect(isStringArray("something else")).to.be.false;
  });
  
  it("Array of numbers", () => {
    expect(isStringArray([1, 2])).to.be.false;
  });
  
  it("Mixture", () => {
    expect(isStringArray(["string", 2])).to.be.false;
  });
  
  it("Array of strings", () => {
    expect(isStringArray(["string", "another string"])).to.be.true;
  });
});

describe("getFederatedApiEndpoint", () => {
  it("No path", () => {
    expect(getFederatedApiEndpoint("it", [])).to.equal("http://it/fed/");
  });
  
  it("Trailing host slash", () => {
    expect(getFederatedApiEndpoint("it/", [])).to.equal("http://it/fed/");
  });
  
  it("Port", () => {
    expect(getFederatedApiEndpoint("it:8080", [])).to.equal("http://it:8080/fed/");
  });
  
  it("Path", () => {
    expect(getFederatedApiEndpoint("it", ["endpoint"])).to.equal("http://it/fed/endpoint");
  });
  
  it("Tailing path slash", () => {
    expect(getFederatedApiEndpoint("it", ["endpoint/"])).to.equal("http://it/fed/endpoint");
  });
  
  it("Leading path slash", () => {
    expect(getFederatedApiEndpoint("it", ["/endpoint"])).to.equal("http://it/fed/endpoint");
  });
  
  it("Trailing and leading path slash", () => {
    expect(getFederatedApiEndpoint("it", ["/endpoint/"])).to.equal("http://it/fed/endpoint");
  });
  
  it("Multiple endpoints", () => {
    expect(getFederatedApiEndpoint("it", ["end", "point"])).to.equal("http://it/fed/end/point");
  });
});
