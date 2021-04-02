/*
 * CS3099 Group A3
 */

import { Parser, InvalidFileError } from "./parser";
import { Message, readZIPFile } from "./helpers";
import { CsvError } from "csv-parse";
import parseCsv from "csv-parse/lib/sync";

export class TestingParser extends Parser {
  constructor(private path: string) {
    super();
  }

  private parseData(data: string): Message[] {
    try {
      const parsedData = parseCsv(data);
      parsedData.shift();

      const messages: Message[] = [];

      for (const row of parsedData) {
        if (row.length !== 3) {
          throw new InvalidFileError();
        }

        messages.push({
          body: row[1],
          spam: row[2] === "1",
        });
      }

      return messages;
    } catch (error) {
      if (error instanceof CsvError) {
        throw new InvalidFileError();
      } else {
        throw error;
      }
    }
  }

  async getMessages(): Promise<Message[]> {
    const { value: file } = await readZIPFile(this.path).next();

    if (!file || file.path !== "messages.csv") {
      throw new InvalidFileError();
    }

    return this.parseData(file.data);
  }
}
