/*
 * Copyright (C) 2021 Kian Cross
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { tensor2d, tidy, Tensor } from "@tensorflow/tfjs-node-gpu";

import { Sequence, Tokenizer } from "./tokenizer";

/**
 * Normalises a sequence to a given length.
 *
 * If the sequence is too long, it is truncated.
 *
 * If the sequence is too short, zeros are appended
 * to the end until it reaches the correct length.
 *
 * This is done in place.
 *
 * @param sequence  The sequence to normalise.
 *
 * @param maxLength  The length to normalise the sequence
 *                   to.
 *
 * @internal
 */
function normaliseSequence(sequence: Sequence, maxLength: number): void {
  const sequenceDelta = maxLength - sequence.length;

  if (sequenceDelta < 0) {
    sequence.splice(maxLength);
  } else if (sequenceDelta > 0) {
    sequence.push(...new Array(sequenceDelta).fill(0));
  }
}

/**
 * Converts an array of sentences into a Tensor, which can be
 * used for training a model.
 *
 * @param sentences  An array of sentences to be converted to a
 *                   tensor.
 *
 * @param tokenizer  The tokenizer to use when converting sentences
 *                   to numerical values.
 *
 * @param maxSequenceLength  The length that sequences should be
 *                           normalised to (making up one of the
 *                           tensor's dimensions).
 *
 * @returns The tensor resulting from conversion of the sentences.
 *
 * @internal
 */
export function getSentencesTensor(
  sentences: string[],
  tokenizer: Tokenizer,
  maxSequenceLength: number,
): Tensor {
  // Convert sentences to sequences.
  const sequences = sentences.map((sentence) => tokenizer.textToSequence(sentence));

  // Normalise sequence lengths.
  sequences.forEach((sequence) => normaliseSequence(sequence, maxSequenceLength));

  return tidy(() => {
    return tensor2d(sequences, [sequences.length, maxSequenceLength]);
  });
}

/**
 * Converts an array of labels into a tensor.
 *
 * @param labels  The labels to convert to a tensor.
 *
 * @returns The tensor resulting from conversion of the labels.
 *
 * @internal
 */
export function getLabelsTensor(labels: Sequence): Tensor {
  return tidy(() => {
    return tensor2d(labels, [labels.length, 1]);
  });
}
