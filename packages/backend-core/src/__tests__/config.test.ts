/*
 * CS3099 Group A3
 */

import test from "ava";
import { config } from "../config";

test("NODE_ENV = production", (t) => {
  process.env.NODE_ENV = "production";
  t.false(config.debug);
});

test("NODE_ENV = test", (t) => {
  process.env.NODE_ENV = "test";
  t.true(config.debug);
});

test("NODE_ENV = debug", (t) => {
  process.env.NODE_ENV = "debug";
  t.true(config.debug);
});

test("SMTP_HOST = undefined", (t) => {
  delete process.env.UNIFED_SMTP_HOST;
  t.throws(() => config.smtpHost);
});

test("SMTP_HOST = string", (t) => {
  process.env.UNIFED_SMTP_HOST = "mail.test.com";
  t.is(config.smtpHost, "mail.test.com");
});

test("SMTP_PORT = undefined", (t) => {
  delete process.env.UNIFED_SMTP_PORT;
  t.throws(() => config.smtpPort);
});

test("SMTP_PORT = string", (t) => {
  process.env.UNIFED_SMTP_PORT = "597-string";
  t.throws(() => config.smtpPort);
});

test("SMTP_PORT = number", (t) => {
  process.env.UNIFED_SMTP_PORT = "597";
  t.is(config.smtpPort, 597);
});

test("SMTP_USERNAME = undefined", (t) => {
  delete process.env.UNIFED_SMTP_USERNAME;
  t.throws(() => config.smtpUsername);
});

test("SMTP_USERNAME = string", (t) => {
  process.env.UNIFED_SMTP_USERNAME = "email_user";
  t.is(config.smtpUsername, "email_user");
});

test("SMTP_PASSWORD = undefined", (t) => {
  delete process.env.UNIFED_SMTP_PASSWORD;
  t.throws(() => config.smtpPassword);
});

test("SMTP_PASSWORD = string", (t) => {
  process.env.UNIFED_SMTP_PASSWORD = "user_password";
  t.is(config.smtpPassword, "user_password");
});

test("MONGO_HOSTNAME = undefined", (t) => {
  delete process.env.UNIFED_MONGO_HOSTNAME;
  t.throws(() => config.mongoHostname);
});

test("MONGO_HOSTNAME = string", (t) => {
  process.env.UNIFED_MONGO_HOSTNAME = "dbhost";
  t.is(config.mongoHostname, "dbhost");
});

test("MONGO_PORT = undefined", (t) => {
  delete process.env.UNIFED_MONGO_PORT;
  t.throws(() => config.mongoPort);
});

test("MONGO_PORT = string", (t) => {
  process.env.UNIFED_MONGO_PORT = "119-string";
  t.throws(() => config.mongoPort);
});

test("MONGO_PORT = number", (t) => {
  process.env.UNIFED_MONGO_PORT = "27017";
  t.is(config.mongoPort, 27017);
});

test("MONGO_DATABASE = undefined", (t) => {
  delete process.env.UNIFED_MONGO_DATABASE;
  t.throws(() => config.mongoDatabase);
});

test("MONGO_DATABASE = string", (t) => {
  process.env.UNIFED_MONGO_DATABASE = "dbname";
  t.is(config.mongoDatabase, "dbname");
});

test("MONGO_USERNAME = undefined", (t) => {
  delete process.env.UNIFED_MONGO_USERNAME;
  t.throws(() => config.mongoUsername);
});

test("MONGO_USERNAME = string", (t) => {
  process.env.UNIFED_MONGO_USERNAME = "dbuser";
  t.is(config.mongoUsername, "dbuser");
});

test("MONGO_PASSWORD = undefined", (t) => {
  delete process.env.UNIFED_MONGO_PASSWORD;
  t.throws(() => config.mongoPassword);
});

test("MONGO_PASSWORD = string", (t) => {
  process.env.UNIFED_MONGO_PASSWORD = "dbpass";
  t.is(config.mongoPassword, "dbpass");
});

test("JWT_SECRET = undefined", (t) => {
  delete process.env.UNIFED_JWT_SECRET;
  t.throws(() => config.jwtSecret);
});

test("JWT_SECRET = string", (t) => {
  process.env.UNIFED_JWT_SECRET = "jwtsec";
  t.is(config.jwtSecret, "jwtsec");
});

test("SITE_HOST = undefined", (t) => {
  delete process.env.UNIFED_SITE_HOST;
  t.throws(() => config.siteHost);
});

test("SITE_HOST = string", (t) => {
  process.env.UNIFED_SITE_HOST = "sitehost";
  t.is(config.siteHost, "sitehost");
});

test("SITE_PROTOCOL = undefined", (t) => {
  delete process.env.UNIFED_SITE_PROTOCOL;
  t.throws(() => config.siteProtocol);
});

test("SITE_PROTOCOL = http", (t) => {
  process.env.UNIFED_SITE_HOST = "http";
  t.is(config.siteHost, "http");
});

test("SITE_PROTOCOL = https", (t) => {
  process.env.UNIFED_SITE_HOST = "https";
  t.is(config.siteHost, "https");
});

test("siteUrl SITE_HOST = undefined", (t) => {
  delete process.env.UNIFED_SITE_HOST;
  process.env.UNIFED_SITE_PROTOCOL = "http";
  t.throws(() => config.siteUrl);
});

test("siteUrl SITE_PROTOCOL = undefined", (t) => {
  process.env.UNIFED_SITE_HOST = "sitehost";
  delete process.env.UNIFED_SITE_PROTOCOL;
  t.throws(() => config.siteUrl);
});

test("siteUrl Format", (t) => {
  process.env.UNIFED_SITE_HOST = "sitehost";
  process.env.UNIFED_SITE_PROTOCOL = "http";
  t.is(config.siteUrl, "http://sitehost");
});

test("SERVER_PORT = undefined", (t) => {
  delete process.env.UNIFED_SERVER_PORT;
  t.throws(() => config.serverPort);
});

test("SERVER_PORT = string", (t) => {
  process.env.UNIFED_SERVER_PORT = "119-string";
  t.throws(() => config.serverPort);
});

test("SERVER_PORT = number", (t) => {
  process.env.UNIFED_SERVER_PORT = "27017";
  t.is(config.serverPort, 27017);
});

test("APPLICATION_NAME = undefined", (t) => {
  delete process.env.UNIFED_APPLICATION_NAME;
  t.throws(() => config.applicationName);
});

test("APPLICATION_NAME = string", (t) => {
  process.env.UNIFED_APPLICATION_NAME = "appname";
  t.is(config.applicationName, "appname");
});

test("LOGGING_LEVEL = undefined", (t) => {
  delete process.env.UNIFED_LOGGING_LEVEL;
  t.throws(() => config.loggingLevel);
});

test("LOGGING_LEVEL = string", (t) => {
  process.env.UNIFED_LOGGING_LEVEL = "debug";
  t.is(config.loggingLevel, "debug");
});
