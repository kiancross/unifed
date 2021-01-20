/*
 * CS3099 Group A3
 */

import { Parser } from "./parser";
import { Message, readZipFile } from "./helpers";

export class SmsParser extends Parser {
  constructor(private path: string) {
    super();
  }

  private parseData(data: string): Message[] {
    const lines = data.split("\n");
    const messages: Message[] = [];

    for (const line of lines) {
      if (!line) {
        continue;
      }

      const splitLine = line.split("\t");
      const type = splitLine[0];
      const body = splitLine[1];

      if (!["ham", "spam"].includes(type)) {
        throw new Error("Unrecognised SMS type");
      }

      messages.push({
        body,
        spam: type === "spam",
      });
    }

    return messages;
  }

  async getMessages(): Promise<Message[]> {
    const file = (await readZipFile(this.path).next()).value;

    if (file.path !== "sms") {
      throw new Error("Unexpected path in SMS zip file");
    }

    return this.parseData(file.data);
  }
}
