/*
 * CS3099 Group A3
 */

import { util } from "@tensorflow/tfjs-node-gpu";
import { SmsParser, EnronParser, SpamAssasinParser, Message, mergeMessageSets } from "./parsers";

export interface SentenceMapping {
  readonly sentences: string[];
  readonly labels: number[];
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
  const index = data.length * ratio;

  const trainingMessages: Message[] = data.slice(0, index);
  const testingMessages: Message[] = data.slice(index);

  return [trainingMessages, testingMessages];
}

export async function getData(): Promise<Message[]> {
  const sms = new SmsParser("data/sms.zip");
  const enron = new EnronParser("data/enron.zip");
  const spamAssasin = new SpamAssasinParser("data/spam-assasin.zip");

  const smsMessages = await sms.getMessages();
  const enronMessages = await enron.getMessages();
  const spamAssasinMessages = await spamAssasin.getMessages();

  const mergedMessages = mergeMessageSets([smsMessages, enronMessages, spamAssasinMessages]);

  util.shuffle(mergedMessages);

  return mergedMessages;
}
