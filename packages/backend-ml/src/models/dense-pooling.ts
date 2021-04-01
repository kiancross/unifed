/*
 * CS3099 Group A3
 */

// Model taken from:
// https://towardsdatascience.com/nlp-detecting-spam-messages-with-tensorflow-part-ii-77826c8f1abf

import { layers, train } from "@tensorflow/tfjs-node-gpu";

import { Config } from "../config";
import { Model } from "./model";

export class DensePoolingModel extends Model {
  externalName = "dense-pooling";

  protected initialiseModel(config: Config): void {
    this.add(
      layers.embedding({
        inputDim: config.vocabSize,
        outputDim: config.embeddingDimension,
        inputLength: config.maxSequenceLength,
      }),
    );

    this.add(layers.globalAveragePooling1d());
    this.add(layers.dense({ units: 6, activation: "relu" }));
    this.add(layers.dense({ units: 1, activation: "sigmoid" }));

    this.compile({ optimizer: train.adam(), loss: "binaryCrossentropy", metrics: ["accuracy"] });
  }
}
