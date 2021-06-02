/*
 * Copyright (C) 2021 Kian Cross
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
