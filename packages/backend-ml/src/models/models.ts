/*
 * CS3099 Group A3
 */

import { EarlyStopping, History, Tensor } from "@tensorflow/tfjs-node-gpu";

import { Config } from "../config";
import { Model } from "./model";
import { TwilioDenseModel } from "./twilio-dense";
import { BiDirectionalLtsmModel } from "./bi-directional-ltsm";
import { DensePoolingModel } from "./dense-pooling";
import { DenseModel } from "./dense";
import { LtsmModel } from "./ltsm";

const models = [TwilioDenseModel, BiDirectionalLtsmModel, DensePoolingModel, DenseModel, LtsmModel];

/**
 * Names of all available models.
 *
 * @internal
 */
export const modelNames = models.map((model) => model.externalName);

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
  model: Model;
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
export function getModel(modelName: string, config: Config): Model {
  for (const model of models) {
    if (model.externalName === modelName) {
      return new model(config);
    }
  }

  throw new ModelNotDefinedError(modelName);
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
  model: Model,
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
