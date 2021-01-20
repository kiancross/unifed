/*
 * CS3099 Group A3
 */

// Model taken from:
// https://towardsdatascience.com/nlp-detecting-spam-messages-with-tensorflow-part-ii-77826c8f1abf

import { EarlyStopping, History, Tensor, layers, sequential, train } from "@tensorflow/tfjs-node";
import { epochs, vocabSize, embeddingDimension, maxSequenceLength } from "../constants";

export const model = sequential();

export async function fitModel(
  trainingSentences: Tensor,
  trainingLabels: Tensor,
  testingSentences: Tensor,
  testingLabels: Tensor,
): Promise<History> {
  const earlyStop = new EarlyStopping({
    monitor: "valLoss",
    patience: 2,
  });

  return await model.fit(trainingSentences, trainingLabels, {
    epochs,
    validationData: [testingSentences, testingLabels],
    callbacks: [earlyStop],
  });
}

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
