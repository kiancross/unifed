/*
 * CS3099 Group A3
 */

// Model taken from:
// https://towardsdatascience.com/nlp-spam-detection-in-sms-text-data-using-deep-learning-b8632db85cc8

import { layers, train } from "@tensorflow/tfjs-node-gpu";

import { Config } from "../config";
import { Model } from "./model";

export class DenseModel extends Model {
  static externalName = "dense";

  protected initialiseModel(config: Config): void {
    this.add(
      layers.embedding({
        inputDim: config.vocabSize,
        outputDim: config.embeddingDimension,
        inputLength: config.maxSequenceLength,
      }),
    );

    this.add(layers.flatten());
    this.add(layers.dense({ units: 6, activation: "relu" }));
    this.add(layers.dense({ units: 1, activation: "sigmoid" }));

    this.compile({ optimizer: train.adam(), loss: "binaryCrossentropy", metrics: ["accuracy"] });
  }
}
