/*
 * CS3099 Group A3
 */

process.env.UNIFED_APPLICATION_NAME = "Something";
process.env.UNIFED_SITE_PROTOCOL = "http";
process.env.UNIFED_SITE_HOST = "localhost";
process.env.UNIFED_JWT_SECRET = "Something";
process.env.UNIFED_SMTP_HOST = "smtp.ethereal.email";
process.env.UNIFED_SMTP_PORT = "587";
process.env.UNIFED_SMTP_USERNAME = "rogers.price3@ethereal.email";
process.env.UNIFED_SMTP_PASSWORD = "YwgzQrmK2gemUfR63g";

import "reflect-metadata";
import test from "ava";
import { setup } from "./helpers";
import { schema } from "../schema";

setup(test);

test("t", async (t) => {
  await schema;
  t.pass();
});
