/*
 * CS3099 Group A3
 */

import { promises as fs } from "fs";
import { Parser, Message } from "./parsers";

export interface SentenceMapping {
  readonly sentences: string[];
  readonly labels: number[];
}

export async function createDirectory(path: string): Promise<void> {
  try {
    await fs.mkdir(path);
  } catch (error) {
    if (error.code !== "EEXIST") {
      throw error;
    }
  }
}

export async function mergeParsers(parsers: Parser[]): Promise<Message[]> {
  const messages: Message[] = [];

  for (const parser of parsers) {
    messages.push(...(await parser.getMessages()));
  }

  return messages;
}

export function arrayToCsv<T, R extends Array<T>>(values: R[]): string {
  return values.map((value) => value.join(",")).join("\n");
}

export function flattenMessages(data: Message[]): SentenceMapping {
  const mapping: SentenceMapping = { sentences: [], labels: [] };

  for (const message of data) {
    mapping.sentences.push(message.body);
    mapping.labels.push(message.spam ? 1 : 0);
  }

  return mapping;
}

export function ratioSplitMessages(data: Message[], ratio: number): [Message[], Message[]] {
  const index = Math.floor(data.length * ratio);

  const trainingMessages: Message[] = data.slice(0, index);
  const testingMessages: Message[] = data.slice(index);

  return [trainingMessages, testingMessages];
}
