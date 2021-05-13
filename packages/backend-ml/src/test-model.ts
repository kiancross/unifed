/*
 * Copyright (C) 2021 Kian Cross
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
