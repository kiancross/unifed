/*
 * CS3099 Group A3
 */

import { Parser } from "./parser";
import { Message, readZipFile } from "./helpers";

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

  private async parse(): Promise<Message[]> {
    const messages: Message[] = [];

    for await (const file of readZipFile(this.path)) {
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

  async getMessages(): Promise<Message[]> {
    return await this.parse();
  }
}
