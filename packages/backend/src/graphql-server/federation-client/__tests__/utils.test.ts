/*
 * CS3099 Group A3
 */

import test from "ava";
import { getFederatedApiEndpoint, isStringArray, RemoteResponseError } from "../utils";

test("RemoteResponseError", (t) => {
  const error = new RemoteResponseError("foo");
  t.regex(error.message, /foo/);
});

test("isStringArray empty", (t) => {
  t.true(isStringArray([]));
});

test("isStringArray not array", (t) => {
  t.false(isStringArray("something else"));
});

test("isStringArray array of numbers", (t) => {
  t.false(isStringArray([1, 2]));
});

test("isStringArray mixture", (t) => {
  t.false(isStringArray(["string", 2]));
});

test("isStringArray array of strings", (t) => {
  t.true(isStringArray(["string", "another string"]));
});

test("getFederatedApiEndpoint no path", (t) => {
  t.is(getFederatedApiEndpoint("test", []), "http://test/fed/");
});

test("getFederatedApiEndpoint trailing host slash", (t) => {
  t.is(getFederatedApiEndpoint("test/", []), "http://test/fed/");
});

test("getFederatedApiEndpoint port", (t) => {
  t.is(getFederatedApiEndpoint("test:8080", []), "http://test:8080/fed/");
});

test("getFederatedApiEndpoint path", (t) => {
  t.is(getFederatedApiEndpoint("test", ["endpoint"]), "http://test/fed/endpoint");
});

test("getFederatedApiEndpoint tailing path slash", (t) => {
  t.is(getFederatedApiEndpoint("test", ["endpoint/"]), "http://test/fed/endpoint");
});

test("getFederatedApiEndpoint leading path slash", (t) => {
  t.is(getFederatedApiEndpoint("test", ["/endpoint"]), "http://test/fed/endpoint");
});

test("getFederatedApiEndpoint trailing and leading path slash", (t) => {
  t.is(getFederatedApiEndpoint("test", ["/endpoint/"]), "http://test/fed/endpoint");
});

test("getFederatedApiEndpoint multiple endpoints", (t) => {
  t.is(getFederatedApiEndpoint("test", ["end", "point"]), "http://test/fed/end/point");
});
