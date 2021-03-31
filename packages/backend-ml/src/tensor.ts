/*
 * CS3099 Group A3
 */

import { tensor2d, tidy, Tensor } from "@tensorflow/tfjs-node-gpu";

import { Sequence, Tokenizer } from "./tokenizer";

function padSequence(sequence: Sequence, maxLength: number): void {
  const sequenceDelta = maxLength - sequence.length;

  if (sequenceDelta < 0) {
    sequence.splice(maxLength);
  } else if (sequenceDelta > 0) {
    sequence.push(...new Array(sequenceDelta).fill(0));
  }
}

export function getSentencesTensor(
  sentences: string[],
  tokenizer: Tokenizer,
  maxSequenceLength: number,
): Tensor {
  const sequences = sentences.map((sentence) => tokenizer.textToSequence(sentence));
  sequences.forEach((sequence) => padSequence(sequence, maxSequenceLength));

  return tidy(() => {
    return tensor2d(sequences, [sequences.length, maxSequenceLength]);
  });
}

export function getLabelsTensor(labels: Sequence): Tensor {
  return tidy(() => {
    return tensor2d(labels, [labels.length, 1]);
  });
}
