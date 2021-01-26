/*
 * CS3099 Group A3
 */

import { Message } from "./parsers";
import { Tokenizer } from "./tokenizer";

export interface SentenceMapping {
  readonly sentences: string[];
  readonly labels: number[];
}

export function getLengthFrequencies(sentences: string[]): { [key: number]: number } {
  return sentences
    .map((sentence) => Tokenizer.cleanText(sentence))
    .map((sentence) => sentence.length)
    .reduce((ret, n) => {
      ret[n] = (ret[n] || 0) + 1;
      return ret;
    }, {} as { [key: number]: number });
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
