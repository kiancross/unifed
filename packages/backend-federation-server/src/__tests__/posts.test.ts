/*
 * CS3099 Group A3
 */

import test from "ava";
import request from "supertest";
import { setup } from "@unifed/backend-testing";
import { app } from "../app";

setup(test);

test.serial("Create post non-existant community", async (t) => {
  const { body } = await request(app).get("/posts").expect(200).expect("Content-Type", /json/);
  t.is(body.length, 0);
});

test.serial("Limit filter NaN", async (t) => {
  const { body } = await request(app)
    .get("/posts?limit=foo")
    .expect(400)
    .expect("Content-Type", /json/);

  t.true(typeof body.error === "string");
});

test.serial("Limit filter negative", async (t) => {
  const { body } = await request(app)
    .get("/posts?limit=-1")
    .expect(400)
    .expect("Content-Type", /json/);

  t.true(typeof body.error === "string");
});

test.serial("minDate filter NaN", async (t) => {
  const { body } = await request(app)
    .get("/posts?minDate=foo")
    .expect(400)
    .expect("Content-Type", /json/);

  t.true(typeof body.error === "string");
});

test.serial("minDate filter negative", async (t) => {
  const { body } = await request(app)
    .get("/posts?minDate=-1")
    .expect(400)
    .expect("Content-Type", /json/);

  t.true(typeof body.error === "string");
});
