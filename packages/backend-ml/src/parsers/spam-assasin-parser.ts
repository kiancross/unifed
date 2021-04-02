/*
 * CS3099 Group A3
 */

import { simpleParser } from "mailparser";
import { Parser } from "./parser";
import { Message, readZIPFile } from "./helpers";

export class SpamAssasinParser extends Parser {
  constructor(private path: string) {
    super();
  }

  private async getBody(data: string): Promise<string | undefined> {
    return new Promise((resolve) => {
      simpleParser(data, (_, email) => resolve(email.text));
    });
  }

  private async parse(): Promise<Message[]> {
    const messages: Message[] = [];

    for await (const file of readZIPFile(this.path)) {
      const body = await this.getBody(file.data);

      if (body === undefined) {
        continue;
      }

      messages.push({
        body: body.trim(),
        spam: file.path.includes("spam"),
      });
    }

    return messages;
  }

  async getMessages(): Promise<Message[]> {
    return await this.parse();
  }
}
