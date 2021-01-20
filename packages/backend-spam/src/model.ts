/*
 * CS3099 Group A3
 */

// Model taken from:
// https://towardsdatascience.com/nlp-spam-detection-in-sms-text-data-using-deep-learning-b8632db85cc8
// https://towardsdatascience.com/nlp-detecting-spam-messages-with-tensorflow-part-ii-77826c8f1abf

import { Tensor, layers, sequential, train } from "@tensorflow/tfjs-node";
import { epochs, vocabSize, embeddingDimension, maxSequenceLength } from "./constants";

export const model = sequential();

export async function fitModel(
  trainingSentences: Tensor,
  trainingLabels: Tensor,
  testingSentences: Tensor,
  testingLabels: Tensor,
): Promise<void> {
  await model.fit(trainingSentences, trainingLabels, {
    epochs,
    validationData: [testingSentences, testingLabels],
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
model.add(layers.dense({ units: 24, activation: "relu" }));
model.add(layers.dropout({ rate: 0.2 }));
model.add(layers.dense({ units: 1, activation: "sigmoid" }));

model.compile({ optimizer: train.adam(), loss: "binaryCrossentropy", metrics: ["accuracy"] });

model.summary();
