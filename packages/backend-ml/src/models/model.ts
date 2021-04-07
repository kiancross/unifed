/*
 * CS3099 Group A3
 */

import { Sequential } from "@tensorflow/tfjs-node-gpu";

import { Config } from "../config";

/**
 * Base class for all models to inherit from.
 *
 * @internal
 */
export abstract class Model extends Sequential {
  /**
   * Name/ID given to the model, which can be used to
   * identify it on a command line or in file names.
   */
  public static readonly externalName: string;

  /**
   * @param config  The [[`Config`]] to use when
   *                initialising the model.
   */
  constructor(config: Config) {
    super();
    this.initialiseModel(config);
  }

  /**
   * Initialise the model with its layers.
   *
   * The model should be left in a compiled state.
   *
   * @param config  The [[`Config`]] to use when
   *                initialising the model.
   */
  protected abstract initialiseModel(config: Config): void;
}
