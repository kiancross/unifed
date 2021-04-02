/*
 * CS3099 Group A3
 */

import { Parser, InvalidFileError } from "./parser";
import { Message, readZIPFile } from "./helpers";

/**
 * Used for parsing the `data/enron.zip` file.
 *
 * @internal
 */
export class EnronParser extends Parser {
  /**
   * @param path  Path to the zip file containing
   *              categorised spam/non-spam messages.
   */
  constructor(private path: string) {
    super();
  }

  /**
   * Messages are in the following format:
   *
   * ```text
   * Subject: need your vics ?
   * brand name meds such as vics , vals , xanies and others
   * 3 why not check it out ?
   * ```
   * This method removes the `Subject:` line and
   * also any empty lines.
   *
   * @param message  The message to extract the
   *                 body from.
   *
   * @returns The message body.
   *
   */
  private getBody(message: string): string {
    const lines = message.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("Subject:")) {
        return lines
          .splice(i + 1)
          .map((line) => line.trim())
          .filter((line) => !!line)
          .join("\n");
      }
    }

    throw new InvalidFileError();
  }

  async getMessages(): Promise<Message[]> {
    const messages: Message[] = [];

    for await (const file of readZIPFile(this.path)) {
      // Ignore invalid file paths (which are LICENSEs and
      // READEMEs).
      if (!file.path.includes("ham") && !file.path.includes("spam")) {
        continue;
      }

      messages.push({
        body: this.getBody(file.data),
        spam: file.path.includes("spam"),
      });
    }

    return messages;
  }
}
