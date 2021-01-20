/*
 * CS3099 Group A3
 */

import { model } from "./twilio-dense";
import { EarlyStopping, History, Tensor } from "@tensorflow/tfjs-node-gpu";
import { epochs, patience } from "../constants";

export { model };

export async function fitModel(
  trainingSentences: Tensor,
  trainingLabels: Tensor,
  testingSentences: Tensor,
  testingLabels: Tensor,
): Promise<History> {
  const earlyStop = new EarlyStopping({
    monitor: "val_loss",
    patience,
  });

  return await model.fit(trainingSentences, trainingLabels, {
    epochs,
    validationData: [testingSentences, testingLabels],
    callbacks: [earlyStop],
  });
}
