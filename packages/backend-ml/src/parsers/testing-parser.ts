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

import { CsvError } from "csv-parse";
import parseCsv from "csv-parse/lib/sync";

import { Parser, InvalidFileError } from "./parser";
import { Message, readZIPFile } from "./helpers";

/**
 * Used for parsing the `data/testing.zip` file.
 *
 * @internal
 */
export class TestingParser extends Parser {
  /**
   * @param path  Path to the zip file containing
   *              categorised spam/non-spam messages.
   */
  constructor(private path: string) {
    super();
  }

  /**
   * Parses the testing data file.
   *
   * The format of this file is a CSV with the following
   * columns: `subject`, `message`, `label`.
   *
   * @param data  The raw file from the ZIP archive.
   *
   * @returns An array of messages parsed from the file.
   */
  private parseData(data: string): Message[] {
    try {
      const parsedData = parseCsv(data);

      // Delete the header row.
      parsedData.shift();

      const messages: Message[] = [];

      for (const row of parsedData) {
        if (row.length !== 3) {
          throw new InvalidFileError();
        }

        messages.push({
          body: row[1],
          spam: row[2] === "1", // 1 = spam message
        });
      }

      return messages;
    } catch (error) {
      if (error instanceof CsvError) {
        throw new InvalidFileError();
      } else {
        throw error;
      }
    }
  }

  async getMessages(): Promise<Message[]> {
    const { value: file } = await readZIPFile(this.path).next();

    // File path must be 'messages.csv'.
    if (!file || file.path !== "messages.csv") {
      throw new InvalidFileError();
    }

    return this.parseData(file.data);
  }
}
