/*
 * CS3099 Group A3
 */

import { Parser, InvalidFileError } from "./parser";
import { Message, readZipFile } from "./helpers";
import parseCsv from "csv-parse/lib/sync";

export class TestingParser extends Parser {
  constructor(private path: string) {
    super();
  }

  private parseData(data: string): Message[] {
    const parsedData = parseCsv(data);
    parsedData.shift();

    return parsedData.map((row: [string, string, string]) => ({
      body: row[1],
      spam: row[2] === "1",
    }));
  }

  async getMessages(): Promise<Message[]> {
    const { value: file } = await readZipFile(this.path).next();

    if (!file || file.path !== "messages.csv") {
      throw new InvalidFileError();
    }

    return this.parseData(file.data);
  }
}
