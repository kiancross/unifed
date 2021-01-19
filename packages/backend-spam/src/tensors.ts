/*
 * CS3099 Group A3
 */

import { tensor2d, tidy, util, Tensor } from "@tensorflow/tfjs-node";
import { SmsParser, EnronParser, SpamAssasinParser, Message, mergeMessageSets } from "./parsers";
import { Tokenizer } from "./tokenizer";
import { maxSequenceLength } from "./constants";

export interface SentenceMapping {
  readonly sentences: string[];
  readonly labels: number[];
}

export function padSequences(sequences: number[][], maxLength: number): number[][] {
  for (const sequence of sequences) {
    const sequenceDelta = maxLength - sequence.length;

    if (sequenceDelta < 0) {
      sequence.splice(maxLength);
    } else if (sequenceDelta > 0) {
      sequence.push(...new Array(sequenceDelta).fill(0));
    }
  }

  return sequences;
}

export function flattenMessages(data: Message[]): SentenceMapping {
  const mapping: SentenceMapping = { sentences: [], labels: [] };

  for (const message of data) {
    mapping.sentences.push(message.body);
    mapping.labels.push(message.spam ? 1 : 0);
  }

  return mapping;
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

export function getTensors(mapping: SentenceMapping, tokenizer: Tokenizer): [Tensor, Tensor] {
  const sequences = tokenizer.textsToSequences(mapping.sentences);
  const paddedSequences = padSequences(sequences, maxSequenceLength);

  return tidy(() => {
    const sentencesTensor = tensor2d(paddedSequences, [paddedSequences.length, maxSequenceLength]);
    const labelsTensor = tensor2d(mapping.labels, [mapping.labels.length, 1]);

    return [sentencesTensor, labelsTensor];
  });
}
