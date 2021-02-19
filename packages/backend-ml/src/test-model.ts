/*
 * CS3099 Group A3
 */

import { promises as fs } from "fs";
import { TestingParser, Message } from "./parsers";
import { getSpamFactor } from "./index";
import { constants } from "./constants";
import { arrayToCsv, createDirectory } from "./helpers";

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

  await fs.writeFile(
    `${outputPath}/${constants.testingResultsSpamName}`,
    arrayToCsv(spam.map((factor) => [1 - factor])),
  );

  await fs.writeFile(
    `${outputPath}/${constants.testingResultsHamName}`,
    arrayToCsv(ham.map((factor) => [factor])),
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
