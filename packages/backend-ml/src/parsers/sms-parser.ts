/*
 * CS3099 Group A3
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
