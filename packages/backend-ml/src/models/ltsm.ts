/*
 * CS3099 Group A3
 */

import { layers, train } from "@tensorflow/tfjs-node-gpu";

import { Config } from "../config";
import { Model } from "./model";

/**
 * Implementation of the LTSM model,
 * found [here](https://towardsdatascience.com/nlp-spam-detection-in-sms-text-data-using-deep-learning-b8632db85cc8).
 *
 * @internal
 */
export class LtsmModel extends Model {
  static externalName = "ltsm";

  protected initialiseModel(config: Config): void {
    this.add(
      layers.embedding({
        inputDim: config.vocabSize,
        outputDim: config.embeddingDimension,
        inputLength: config.maxSequenceLength,
      }),
    );

    this.add(
      layers.lstm({
        units: config.lstmUnits,
        dropout: config.dropout,
        returnSequences: true,
      }),
    );

    this.add(
      layers.lstm({
        units: config.lstmUnits,
        dropout: config.dropout,
        returnSequences: false,
      }),
    );

    this.add(layers.dense({ units: 1, activation: "sigmoid" }));

    this.compile({ optimizer: train.adam(), loss: "binaryCrossentropy", metrics: ["accuracy"] });
  }
}
