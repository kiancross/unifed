/*
 * CS3099 Group A3
 */

import { getFederatedApiEndpoint } from "./utils";

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
