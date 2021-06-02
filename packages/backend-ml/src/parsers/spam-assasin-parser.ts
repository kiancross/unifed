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
