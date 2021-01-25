/*
 * CS3099 Group A3
 */

import test from "ava";
import { dateToUnixTimestamp, getIdFromRef } from "../helpers";

test("dateToUnixTimestamp 1", (t) => {
  t.is(dateToUnixTimestamp(new Date("2020-11-10T19:34:53+00:00")), 1605036893);
});

test("dateToUnixTimestamp 2", (t) => {
  t.is(dateToUnixTimestamp(new Date("2017-09-10T09:48:13+00:00")), 1505036893);
});

test("isRefType", (t) => {
  t.is(getIdFromRef("someid"), "someid");
});
