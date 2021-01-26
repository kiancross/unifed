/*
 * CS3099 Group A3
 */

// Model taken from:
// https://towardsdatascience.com/nlp-detecting-spam-messages-with-tensorflow-part-ii-77826c8f1abf

import { Sequential, layers, sequential, train } from "@tensorflow/tfjs-node-gpu";
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
  model.add(layers.globalAveragePooling1d());
  model.add(layers.dense({ units: 6, activation: "relu" }));
  model.add(layers.dense({ units: 1, activation: "sigmoid" }));

  model.compile({ optimizer: train.adam(), loss: "binaryCrossentropy", metrics: ["accuracy"] });

  return model;
};
