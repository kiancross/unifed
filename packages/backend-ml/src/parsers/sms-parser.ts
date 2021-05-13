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

import { Parser, InvalidFileError } from "./parser";
import { Message, readZIPFile } from "./helpers";

/**
 * Used for parsing the `data/sms.zip` file.
 *
 * @internal
 */
export class SMSParser extends Parser {
  /**
   * @param path  Path to the zip file containing
   *              categorised spam/non-spam messages.
   */
  constructor(private path: string) {
    super();
  }

  /**
   * Parses the SMS data file.
   *
   * The file is in the following format:
   *
   * ```text
   * ham  Hello World
   * spam  Free entry in 2 a wkly comp
   * ```
   *
   * The delimiter between the first and subsequent
   * tokens is a tab character.
   *
   * @param data  The raw file from the ZIP archive.
   *
   * @returns An array of messages parsed from the file.
   */
  private parseData(data: string): Message[] {
    const lines = data.split("\n");
    const messages: Message[] = [];

    for (const line of lines) {
      // Skip empty lines.
      if (!line) {
        continue;
      }

      const splitLine = line.split("\t");
      const type = splitLine[0];
      const body = splitLine[1];

      if (!["ham", "spam"].includes(type)) {
        throw new InvalidFileError();
      }

      messages.push({
        body,
        spam: type === "spam",
      });
    }

    return messages;
  }

  async getMessages(): Promise<Message[]> {
    const { value: file } = await readZIPFile(this.path).next();

    // File path must be 'sms'.
    if (!file || file.path !== "sms") {
      throw new InvalidFileError();
    }

    return this.parseData(file.data);
  }
}
