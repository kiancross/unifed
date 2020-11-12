/*
 * CS3099 Group A3
 */

import { getFederatedApiEndpoint, isStringArray, RemoteResponseError } from "./utils";

describe("RemoteResponseError", () => {
  test("Message", () => {
    const error = new RemoteResponseError("foo");
    expect(error.message).toMatch("foo");
  });
});

describe("isStringArray", () => {
  test("Empty", () => {
    expect(isStringArray([])).toBe(true);
  });
  
  test("Not array", () => {
    expect(isStringArray("something else")).toBe(false);
  });
  
  test("Array of numbers", () => {
    expect(isStringArray([1, 2])).toBe(false);
  });
  
  test("Mixture", () => {
    expect(isStringArray(["string", 2])).toBe(false);
  });
  
  test("Array of strings", () => {
    expect(isStringArray(["string", "another string"])).toBe(true);
  });
});

describe("getFederatedApiEndpoint", () => {
  test("No path", () => {
    expect(getFederatedApiEndpoint("test", [])).toBe("http://test/fed/");
  });
  
  test("Trailing host slash", () => {
    expect(getFederatedApiEndpoint("test/", [])).toBe("http://test/fed/");
  });
  
  test("Port", () => {
    expect(getFederatedApiEndpoint("test:8080", [])).toBe("http://test:8080/fed/");
  });
  
  test("Path", () => {
    expect(getFederatedApiEndpoint("test", ["endpoint"])).toBe("http://test/fed/endpoint");
  });
  
  test("Tailing path slash", () => {
    expect(getFederatedApiEndpoint("test", ["endpoint/"])).toBe("http://test/fed/endpoint");
  });
  
  test("Leading path slash", () => {
    expect(getFederatedApiEndpoint("test", ["/endpoint"])).toBe("http://test/fed/endpoint");
  });
  
  test("Trailing and leading path slash", () => {
    expect(getFederatedApiEndpoint("test", ["/endpoint/"])).toBe("http://test/fed/endpoint");
  });
  
  test("Multiple endpoints", () => {
    expect(getFederatedApiEndpoint("test", ["end", "point"])).toBe("http://test/fed/end/point");
  });
});
