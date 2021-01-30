/*
 * CS3099 Group A3
 */

import { Parser, InvalidFileError } from "./parser";
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
    const { value: file } = await readZipFile(this.path).next();

    if (!file || file.path !== "sms") {
      throw new InvalidFileError();
    }

    return this.parseData(file.data);
  }
}
