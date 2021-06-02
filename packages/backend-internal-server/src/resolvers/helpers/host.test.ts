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

import { normaliseHost, getAddressableHost, translateHost, HostNotSetError } from "./host";

test("localHost (this)", async (t) => {
  t.is(await normaliseHost("this"), "this");
});

test("External host without port", async (t) => {
  t.is(await normaliseHost("google.com"), "google.com");
});

test("External host with port", async (t) => {
  t.is(await normaliseHost("google.com:8080"), "google.com:8080");
});

test("External IP address without port", async (t) => {
  t.is(await normaliseHost("216.58.213.14"), "216.58.213.14");
});

test("External IP address with port", async (t) => {
  t.is(await normaliseHost("216.58.213.14:8080"), "216.58.213.14:8080");
});

test("Internal host without port", async (t) => {
  t.is(await normaliseHost("localhost"), "this");
});

test("Internal host with port", async (t) => {
  t.is(await normaliseHost("localhost:8080"), "this");
});

test("Internal IP address without port", async (t) => {
  t.is(await normaliseHost("127.0.0.1"), "this");
});

test("Internal IP address with port", async (t) => {
  t.is(await normaliseHost("127.0.0.1:8080"), "this");
});

test("Invalid host", async (t) => {
  t.is(await normaliseHost("foo"), "foo");
});

test("normaliseHost unset host", async (t) => {
  await t.throwsAsync(async () => await normaliseHost(""), { instanceOf: HostNotSetError });
});

test("getAddressableHost unset host", async (t) => {
  t.throws(() => getAddressableHost(""), { instanceOf: HostNotSetError });
});

test("translateHost unset host", async (t) => {
  await t.throwsAsync(async () => await translateHost(""), { instanceOf: HostNotSetError });
});

test("External addressable host", async (t) => {
  t.is(getAddressableHost("google.com"), "google.com");
});

test("Local addressable host", async (t) => {
  t.is(getAddressableHost("this"), "proxy:80");
});

test("Translate internal host", async (t) => {
  t.is(await translateHost("localhost"), "proxy:80");
});

test("Translate external host", async (t) => {
  t.is(await translateHost("google.com"), "google.com");
});
