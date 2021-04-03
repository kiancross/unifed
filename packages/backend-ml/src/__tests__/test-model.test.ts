/*
 * CS3099 Group A3
 */

import test from "ava";
import os from "os";
import fs, { promises as fsPromises } from "fs";
import { Message } from "../parsers";
import * as constants from "../constants";
import { testModel } from "../test-model";

test("testModel", async (t) => {
  const messages: Message[] = [
    {
      body: "hello this is a long message",
      spam: false,
    },
    {
      body: "world",
      spam: true,
    },
  ];

  const path = await fsPromises.mkdtemp(os.tmpdir() + "/");

  await testModel(messages, path);

  t.true(fs.existsSync(`${path}/${constants.testingResultsHamName}`));
  t.true(fs.existsSync(`${path}/${constants.testingResultsSpamName}`));

  fs.rmdirSync(path, { recursive: true });
});
