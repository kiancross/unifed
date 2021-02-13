/*
 * CS3099 Group A3
 */

import test from "ava";
import { InvalidFileError } from "../parser";
import { EnronParser } from "../enron-parser";

test("Parse valid", async (t) => {
  const parser = new EnronParser(`${__dirname}/../../../test-data/enron-valid.zip`);
  const messages = await parser.getMessages();

  t.deepEqual(messages, [
    { body: "hamMessage", spam: false },
    { body: "spamMessage", spam: true },
  ]);
});

test("Parse invalid", async (t) => {
  const parser = new EnronParser(`${__dirname}/../../../test-data/enron-invalid.zip`);

  await t.throwsAsync(async () => await parser.getMessages(), {
    instanceOf: InvalidFileError,
  });
});
