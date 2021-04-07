/*
 * CS3099 Group A3
 */

import { promises as fs } from "fs";

import { TestingParser, Message } from "./parsers";
import { getSpamFactor } from "./index";
import * as constants from "./constants";
import { arrayToCSV, createDirectory } from "./helpers";

/**
 * Tests a set of messages against the default model
 * and writes the results to a file.
 *
 * @param message  The messages used to test the default
 *                 model.
 *
 * @param outputPath  The file path to write the results
 *                    at.
 *
 * @internal
 */
export async function testModel(messages: Message[], outputPath: string): Promise<void> {
  const spam: number[] = [];
  const ham: number[] = [];

  for (const message of messages) {
    const factor = await getSpamFactor(message.body);

    if (message.spam) {
      spam.push(factor);
    } else {
      ham.push(factor);
    }
  }

  // Write the results as the deviation from the expected value.

  await fs.writeFile(
    `${outputPath}/${constants.testingResultsSpamName}`,
    arrayToCSV(spam.map((factor) => [1 - factor])),
  );

  await fs.writeFile(
    `${outputPath}/${constants.testingResultsHamName}`,
    arrayToCSV(ham.map((factor) => [factor])),
  );
}

if (require.main === module) {
  (async () => {
    const parser = new TestingParser("data/testing.zip");
    const messages = await parser.getMessages();

    await createDirectory(constants.metaPath);

    await testModel(messages, constants.metaPath);
  })();
}
