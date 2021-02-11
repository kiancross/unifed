/*
 * CS3099 Group A3
 */

import test from "ava";
import nock from "nock";
import { FederationHttpClient } from "../http-client";

let httpClient: FederationHttpClient;

test.beforeEach(() => {
  httpClient = new FederationHttpClient("host");
});

test("get", async (t) => {
  const scope = nock("http://host").get("/fed/get").reply(200, []);

  t.deepEqual(await httpClient.get("get"), []);

  scope.done();
});

test("post", async (t) => {
  const scope = nock("http://host").post("/fed/post").reply(200, []);

  t.deepEqual(await httpClient.post("post"), []);

  scope.done();
});

test("put", async (t) => {
  const scope = nock("http://host").put("/fed/put").reply(200, []);

  t.deepEqual(await httpClient.put("put"), []);

  scope.done();
});

test("delete", async (t) => {
  const scope = nock("http://host").delete("/fed/delete").reply(200, []);

  t.deepEqual(await httpClient.delete("delete"), []);

  scope.done();
});
