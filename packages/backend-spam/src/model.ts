/*
 * CS3099 Group A3
 */

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
