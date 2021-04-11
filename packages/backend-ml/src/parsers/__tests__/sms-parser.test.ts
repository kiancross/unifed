/*
 * CS3099 Group A3
 */

import test from "ava";
import { InvalidFileError } from "../parser";
import { SMSParser } from "../sms-parser";

test("Parse valid", async (t) => {
  const parser = new SMSParser(`${__dirname}/../../../test-data/sms-valid.zip`);
  const messages = await parser.getMessages();

  t.deepEqual(messages, [
    { body: "hamMessage", spam: false },
    { body: "spamMessage", spam: true },
  ]);
});

test("Parse invalid file", async (t) => {
  const parser = new SMSParser(`${__dirname}/../../../test-data/sms-invalid-file.zip`);

  await t.throwsAsync(async () => await parser.getMessages(), {
    instanceOf: InvalidFileError,
  });
});

test("Parse invalid type", async (t) => {
  const parser = new SMSParser(`${__dirname}/../../../test-data/sms-invalid-type.zip`);

  await t.throwsAsync(async () => await parser.getMessages(), {
    instanceOf: InvalidFileError,
  });
});
