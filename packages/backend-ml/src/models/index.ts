/*
 * CS3099 Group A3
 */

import { EarlyStopping, History, Tensor, Sequential } from "@tensorflow/tfjs-node-gpu";
import { Config } from "../config";
import { getModel as twilioDenseModel } from "./twilio-dense";
import { getModel as biDirectionalLtsm } from "./bi-directional-ltsm";
import { getModel as densePoolingModel } from "./dense-pooling";
import { getModel as denseModel } from "./dense";
import { getModel as ltsmModel } from "./ltsm";

const modelMap: { [model: string]: (c: Config) => Sequential } = {
  "bi-directional-ltsm": biDirectionalLtsm,
  "dense-pooling": densePoolingModel,
  dense: denseModel,
  ltsm: ltsmModel,
  "twilio-dense": twilioDenseModel,
};

export interface TrainedModel {
  history: History;
  model: Sequential;
}

export class ModelNotDefinedError extends Error {
  constructor(name: string) {
    super(`Model '${name}' is not defined`);
  }
}

export function getModel(model: string, config: Config): Sequential {
  if (model in modelMap) {
    return modelMap[model](config);
  }

  throw new ModelNotDefinedError(model);
}

export async function fitModel(
  model: Sequential,
  trainingSentences: Tensor,
  trainingLabels: Tensor,
  testingSentences: Tensor,
  testingLabels: Tensor,
  config: Config,
): Promise<TrainedModel> {
  const earlyStop = new EarlyStopping({
    monitor: "val_loss",
    patience: config.patience,
  });

  const history = await model.fit(trainingSentences, trainingLabels, {
    epochs: config.epochs,
    validationData: [testingSentences, testingLabels],
    callbacks: [earlyStop],
  });

  return { model, history };
}

export const models = Object.keys(modelMap);
