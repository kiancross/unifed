/*
 * CS3099 Group A3
 */

import { Parser, Messages } from "./parser";
import { readZipFile } from "./helpers";

export class SmsParser extends Parser {
  constructor(private path: string) {
    super();
  }

  private parseData(data: string): Messages {
    const lines = data.split("\n");
    const messages: Messages = { spam: [], ham: [] };

    for (const line of lines) {
      if (!line) {
        continue;
      }

      const splitLine = line.split("\t");
      const type = splitLine[0];
      const message = splitLine[1];

      if (type === "ham") {
        messages.ham.push(message);
      } else if (type === "spam") {
        messages.spam.push(message);
      } else {
        throw new Error("Unrecognised SMS type");
      }
    }

    return messages;
  }

  async getMessages(): Promise<Messages> {
    const file = (await readZipFile(this.path).next()).value;

    if (file.path !== "sms") {
      throw new Error("Unexpected path in SMS zip file");
    }

    return this.parseData(file.data);
  }
}
