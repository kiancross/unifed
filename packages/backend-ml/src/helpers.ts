/*
 * CS3099 Group A3
 */

import { promises as fs } from "fs";
import { Parser, Message } from "./parsers";

/**
 * Maps sentences to labels. Sentences are the posts/messages
 * and labels a number between 0 and 1, representing non-spam
 * and spam respectively.
 *
 * The indexes between the two arrays should correspond.
 *
 * @internal
 */
export interface SentenceMapping {
  /**
   * An array of sentences.
   */
  readonly sentences: string[];

  /**
   * An array of labels corresponding to the sentences.
   *
   * These should be a value between 0 and 1, representing
   * non-spam and spam respectively.
   */
  readonly labels: number[];
}

/**
 * Creates a directory.
 *
 * If the directory already exists, this is a noop.
 *
 * @param path  The path to create the directory at.
 *
 * @internal
 */
export async function createDirectory(path: string): Promise<void> {
  try {
    await fs.mkdir(path);
  } catch (error) {
    if (error.code !== "EEXIST") {
      throw error;
    }
  }
}

/**
 * Merges the messages from multiple parsers into a single
 * array of messages.
 *
 * @param parsers  The array of parsers for which messages should
 *                 be merged.
 *
 * @internal
 */
export async function mergeParsers(parsers: Parser[]): Promise<Message[]> {
  const messages: Message[] = [];

  for (const parser of parsers) {
    messages.push(...(await parser.getMessages()));
  }

  return messages;
}

/**
 * Converts a 2D array to a CSV.
 *
 * This is a very naive implementation, which does not consider
 * commas in the actual values, however it is good enough for
 * this purpose.
 *
 * @param values  A 2D array of values to convert to a CSV.
 *                The first level of the array are treated as
 *                rows. The values in the second level are
 *                treated as columns.
 *
 * @typeParam T  The type of values contained in the 2D array.
 *
 * @returns The converted CSV value.
 *
 * @internal
 */
export function arrayToCsv<T, R extends Array<T>>(values: R[]): string {
  return values.map((value) => value.join(",")).join("\n");
}

/**
 * Flattens an array of [[`Message`]] objects into an array
 * of sentences and array of labels, returned as a
 * [[`SentenceMapping`]].
 *
 * @param messages  The messages to flatten.
 *
 * @returns A flattened representation of the messages, as
 *          two arrays with corresponding indexes.
 *
 * @internal
 */
export function flattenMessages(messages: Message[]): SentenceMapping {
  const mapping: SentenceMapping = { sentences: [], labels: [] };

  for (const message of messages) {
    mapping.sentences.push(message.body);
    mapping.labels.push(message.spam ? 1 : 0);
  }

  return mapping;
}

/**
 * Splits an array into two parts using the given
 * ratio.
 *
 * @param data  The array to split.
 *
 * @param ratio  The ration used to split the array. This
 *               should be a number in-between 0 and 1.
 *
 * @typeParam T  The type of elements in the array.
 *
 * @returns A tuple of length two containing the split
 *          array.
 *
 * @internal
 */
export function ratioSplitArray<T>(data: T[], ratio: number): [T[], T[]] {
  const index = Math.floor(data.length * ratio);

  const start: T[] = data.slice(0, index);
  const end: T[] = data.slice(index);

  return [start, end];
}
