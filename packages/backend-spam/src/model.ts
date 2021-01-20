/*
 * CS3099 Group A3
 */

// Model taken from:
// https://towardsdatascience.com/nlp-spam-detection-in-sms-text-data-using-deep-learning-b8632db85cc8

import { layers, sequential, train } from "@tensorflow/tfjs-node";
import { vocabSize, embeddingDimension, maxSequenceLength } from "./constants";

export const model = sequential();

model.add(
  layers.embedding({
    inputDim: vocabSize,
    outputDim: embeddingDimension,
    inputLength: maxSequenceLength,
  }),
);
model.add(layers.flatten());
model.add(layers.dense({ units: 6, activation: "relu" }));
model.add(layers.dense({ units: 1, activation: "sigmoid" }));

model.compile({ optimizer: train.adam(), loss: "binaryCrossentropy", metrics: ["accuracy"] });

model.summary();
