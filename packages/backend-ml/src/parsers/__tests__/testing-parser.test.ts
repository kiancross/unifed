/*
 * CS3099 Group A3
 */

import test from "ava";
import { InvalidFileError } from "../parser";
import { TestingParser } from "../testing-parser";

test("Parse valid", async (t) => {
  const parser = new TestingParser(`${__dirname}/../../../test-data/testing-valid.zip`);
  const messages = await parser.getMessages();

  t.deepEqual(messages, [
    { body: "bar", spam: true },
    { body: "baz", spam: false },
  ]);
});

test("Parse invalid file", async (t) => {
  const parser = new TestingParser(`${__dirname}/../../../test-data/testing-invalid-file.zip`);

  await t.throwsAsync(async () => await parser.getMessages(), {
    instanceOf: InvalidFileError,
  });
});

test("Parse invalid type", async (t) => {
  const parser = new TestingParser(`${__dirname}/../../../test-data/testing-invalid-type.zip`);

  await t.throwsAsync(async () => await parser.getMessages(), {
    instanceOf: InvalidFileError,
  });
});
