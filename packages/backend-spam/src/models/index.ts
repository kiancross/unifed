/*
 * CS3099 Group A3
 */

import { model } from "./ltsm";
import { EarlyStopping, History, Tensor } from "@tensorflow/tfjs-node";
import { epochs } from "../constants";

export { model };

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
