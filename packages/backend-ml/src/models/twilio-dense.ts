/*
 * CS3099 Group A3
 */

// Model taken from:
// https://www.twilio.com/blog/spam-deep-learning-detection-sms-keras-python-twilio

import { layers, train } from "@tensorflow/tfjs-node-gpu";

import { Config } from "../config";
import { Model } from "./model";

/**
 * Implementation of the dense model,
 * found [here](https://www.twilio.com/blog/spam-deep-learning-detection-sms-keras-python-twilio).
 *
 * @internal
 */
export class TwilioDenseModel extends Model {
  static externalName = "twilio-dense";

  protected initialiseModel(config: Config): void {
    this.add(
      layers.embedding({
        inputDim: config.vocabSize,
        outputDim: config.embeddingDimension,
        inputLength: config.maxSequenceLength,
      }),
    );

    this.add(layers.flatten());
    this.add(layers.dense({ units: 500, activation: "relu" }));
    this.add(layers.dense({ units: 200, activation: "relu" }));
    this.add(layers.dropout({ rate: 0.5 }));
    this.add(layers.dense({ units: 100, activation: "relu" }));
    this.add(layers.dense({ units: 1, activation: "sigmoid" }));

    this.compile({
      optimizer: train.rmsprop(0.001),
      loss: "binaryCrossentropy",
      metrics: ["accuracy"],
    });
  }
}
