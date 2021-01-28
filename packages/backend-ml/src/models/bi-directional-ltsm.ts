/*
 * CS3099 Group A3
 */

// Model taken from:
// https://towardsdatascience.com/nlp-spam-detection-in-sms-text-data-using-deep-learning-b8632db85cc8

import { Sequential, RNN, layers, sequential, train } from "@tensorflow/tfjs-node-gpu";
import { Config } from "../config";

export const getModel = (config: Config): Sequential => {
  const model = sequential();

  model.add(
    layers.embedding({
      inputDim: config.vocabSize,
      outputDim: config.embeddingDimension,
      inputLength: config.maxSequenceLength,
    }),
  );
  model.add(
    layers.bidirectional({
      layer: layers.lstm({
        units: config.lstmUnits,
        dropout: config.dropout,
      }) as RNN,
    }),
  );
  model.add(layers.dense({ units: 1, activation: "sigmoid" }));

  model.compile({ optimizer: train.adam(), loss: "binaryCrossentropy", metrics: ["accuracy"] });

  return model;
};
