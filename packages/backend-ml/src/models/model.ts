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
