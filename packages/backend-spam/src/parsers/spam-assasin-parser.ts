/*
 * CS3099 Group A3
 */

import { Parser } from "./parser";
import { Message } from "./message";
import { simpleParser } from "mailparser";
import { readZipFile } from "./helpers";

export class SpamAssasinParser extends Parser {
  constructor(private path: string) {
    super();
  }

  private async getBody(data: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      simpleParser(data, (error, email) => {
        if (error) {
          return reject(error);
        }

        resolve(email.text);
      });
    });
  }

  private async parse(): Promise<Message[]> {
    const messages: Message[] = [];

    for await (const file of readZipFile(this.path)) {
      const body = await this.getBody(file.data);

      if (body === undefined || !(file.path.includes("ham") && file.path.includes("spam"))) {
        continue;
      }

      messages.push({
        body,
        spam: file.path.includes("spam"),
      });
    }

    return messages;
  }

  async getMessages(): Promise<Message[]> {
    return await this.parse();
  }
}
