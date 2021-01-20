/*
 * CS3099 Group A3
 */

// Model taken from:
// https://towardsdatascience.com/nlp-detecting-spam-messages-with-tensorflow-part-ii-77826c8f1abf

import { layers, sequential, train } from "@tensorflow/tfjs-node-gpu";
import { vocabSize, embeddingDimension, maxSequenceLength } from "../constants";

export const model = sequential();

model.add(
  layers.embedding({
    inputDim: vocabSize,
    outputDim: embeddingDimension,
    inputLength: maxSequenceLength,
  }),
);
model.add(layers.globalAveragePooling1d());
model.add(layers.dense({ units: 6, activation: "relu" }));
model.add(layers.dense({ units: 1, activation: "sigmoid" }));

model.compile({ optimizer: train.adam(), loss: "binaryCrossentropy", metrics: ["accuracy"] });

model.summary();
