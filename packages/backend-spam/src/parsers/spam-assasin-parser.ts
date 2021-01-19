/*
 * CS3099 Group A3
 */

import { Parser, Messages } from "./parser";
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

  private async parse(): Promise<Messages> {
    const messages: Messages = { ham: [], spam: [] };

    for await (const file of readZipFile(this.path)) {
      const body = await this.getBody(file.data);

      if (body === undefined) {
        continue;
      }

      if (file.path.includes("ham")) {
        messages.ham.push(body);
      } else if (file.path.includes("spam")) {
        messages.spam.push(body);
      }
    }

    return messages;
  }

  async getMessages(): Promise<Messages> {
    return await this.parse();
  }
}
