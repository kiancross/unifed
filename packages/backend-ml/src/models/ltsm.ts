/*
 * Copyright (C) 2021 Kian Cross
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
export class LTSMModel extends Model {
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
