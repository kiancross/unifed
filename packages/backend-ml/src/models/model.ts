/*
 * CS3099 Group A3
 */

import { Sequential } from "@tensorflow/tfjs-node-gpu";

import { Config } from "../config";

/**
 * Base class for all models to inherit from.
 */
export abstract class Model extends Sequential {
  public static externalName: string;

  constructor(config: Config) {
    super();
    this.initialiseModel(config);
  }

  protected abstract initialiseModel(config: Config): void;
}
