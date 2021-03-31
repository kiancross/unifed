/*
 * CS3099 Group A3
 */

import { EarlyStopping, History, Tensor, Sequential } from "@tensorflow/tfjs-node-gpu";

import { Config } from "../config";
import { twilioDenseModel } from "./twilio-dense";
import { biDirectionalLtsmModel } from "./bi-directional-ltsm";
import { densePoolingModel } from "./dense-pooling";
import { denseModel } from "./dense";
import { ltsmModel } from "./ltsm";

// Map of model names to model implementations.
const modelMap: { [model: string]: (c: Config) => Sequential } = {
  "bi-directional-ltsm": biDirectionalLtsmModel,
  "dense-pooling": densePoolingModel,
  dense: denseModel,
  ltsm: ltsmModel,
  "twilio-dense": twilioDenseModel,
};

/**
 * Results of a trained model.
 *
 * @internal
 */
export interface TrainedModel {
  /**
   * Statistics produced whilst generating
   * the model, such as number of epochs,
   * loss and accuracy.
   */
  history: History;

  /**
   * The trained model.
   */
  model: Sequential;
}

/**
 * Error thrown if the model name passed to
 * [[`getModel`]] does not exist.
 *
 * @internal
 */
export class ModelNotDefinedError extends Error {
  /**
   * @param name  Name of the non-existent model.
   */
  constructor(name: string) {
    super(`Model '${name}' is not defined`);
  }
}

/**
 * Initialises a model (by name) with a given
 * configuration.
 *
 * @param model  The name of the model to initialise.
 *
 * @param config  The [[`Config`]] to initialise the model
 *                with.
 *
 * @returns An initialised model.
 *
 * @internal
 */
export function getModel(model: string, config: Config): Sequential {
  if (model in modelMap) {
    return modelMap[model](config);
  }

  throw new ModelNotDefinedError(model);
}

/**
 * Fits a given model to a set of training and validation data
 * data.
 *
 * @param model  The model to fit.
 *
 * @param trainingSentences  The training sentences (i.e.
 *                           messages/posts).
 *
 * @param trainingLabels  The training labels (i.e. spam/non-spam
 *                        classifications).
 *
 * @param testingSentences  The testing sentences (i.e.
 *                          messages/posts), which are used for
 *                          validation.
 *
 * @param testingLabels  The testing labels (i.e. spam/non-spam
 *                       classifications).
 *
 * @param config  The [[`Config`]] to use when fitting the model.
 *
 * @returns The trained model and training statistics.
 *
 * @internal
 */
export async function fitModel(
  model: Sequential,
  trainingSentences: Tensor,
  trainingLabels: Tensor,
  testingSentences: Tensor,
  testingLabels: Tensor,
  config: Config,
): Promise<TrainedModel> {
  // Setup an early stop to prevent over-fitting.
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

/**
 * Names of all available models.
 *
 * @internal
 */
export const models = Object.keys(modelMap);
