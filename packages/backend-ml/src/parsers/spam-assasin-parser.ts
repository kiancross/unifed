/*
 * CS3099 Group A3
 */

import { simpleParser } from "mailparser";

import { Parser } from "./parser";
import { Message, readZIPFile } from "./helpers";

/**
 * Used for parsing the `data/spam-assasin.zip` file.
 *
 * @internal
 */
export class SpamAssasinParser extends Parser {
  /**
   * @param path  Path to the zip file containing
   *              categorised spam/non-spam messages.
   */
  constructor(private path: string) {
    super();
  }

  /**
   * Obtains the body of an email in the
   * [MIME RFC 822](https://tools.ietf.org/html/rfc822)
   * format.
   *
   * @param data  Email in the MIME RFC 822 format.
   *
   * @returns The body component of the email.
   */
  private async getBody(data: string): Promise<string | undefined> {
    return new Promise((resolve) => {
      simpleParser(data, (_, email) => resolve(email.text));
    });
  }

  async getMessages(): Promise<Message[]> {
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
}
