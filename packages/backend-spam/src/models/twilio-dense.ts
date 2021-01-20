/*
 * CS3099 Group A3
 */

// Model taken from:
// https://www.twilio.com/blog/spam-deep-learning-detection-sms-keras-python-twilio

import { layers, sequential, train } from "@tensorflow/tfjs-node";
import { vocabSize, embeddingDimension, maxSequenceLength } from "../constants";

export const model = sequential();

model.add(
  layers.embedding({
    inputDim: vocabSize,
    outputDim: embeddingDimension,
    inputLength: maxSequenceLength,
  }),
);
model.add(layers.flatten());
model.add(layers.dense({ units: 500, activation: "relu" }));
model.add(layers.dense({ units: 200, activation: "relu" }));
model.add(layers.dropout({ rate: 0.5 }));
model.add(layers.dense({ units: 100, activation: "relu" }));
model.add(layers.dense({ units: 1, activation: "sigmoid" }));

model.compile({
  optimizer: train.rmsprop(0.001),
  loss: "binaryCrossentropy",
  metrics: ["accuracy"],
});

model.summary();
