/*
 * CS3099 Group A3
 */

import { Parser, Messages } from "./parser";
import { readZipFile } from "./helpers";

export class EnronParser extends Parser {
  constructor(private path: string) {
    super();
  }

  private getBody(data: string): string {
    const lines = data.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("Subject:")) {
        return lines.splice(i + 1).join("\n");
      }
    }

    throw new Error("Email has no body: " + data);
  }

  private async parse(): Promise<Messages> {
    const messages: Messages = { ham: [], spam: [] };

    for await (const file of readZipFile(this.path)) {
      if (file.path.includes("ham")) {
        messages.ham.push(this.getBody(file.data));
      } else if (file.path.includes("spam")) {
        messages.spam.push(this.getBody(file.data));
      }
    }

    return messages;
  }

  async getMessages(): Promise<Messages> {
    return await this.parse();
  }
}
