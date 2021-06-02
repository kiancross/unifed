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

/**
 * Configuration used for training models.
 *
 * @internal
 */
export interface Config {
  /**
   * The maximum vocabulary size.
   *
   * This value corresponds to the maximum number of
   * distinct symbols (usually words) stored.
   *
   * Larger values are better, but take longer to
   * train and use more memory.
   */
  vocabSize: number;

  /**
   * The maximum sequence length.
   *
   * This value corresponds to the length that each
   * sequence is normalised to.
   *
   * Larger values are better, but take longer to
   * train and use more memory.
   */
  maxSequenceLength: number;

  /**
   * The output dimension used for the embedding layer.
   *
   * See [here](https://js.tensorflow.org/api/latest/#layers.embedding)
   * for further details.
   */
  embeddingDimension: number;

  /**
   * The ratio of messages to split between training and
   * validation.
   *
   * This must be a value greater than 0 and less than 1.
   */
  trainingRatio: number;

  /**
   * The total number of iterations to use when training
   * a model.
   *
   * The total number of iterations may be less
   * than this if the conditions for
   * [`earlyStopping`](https://js.tensorflow.org/api/latest/#callbacks.earlyStopping)
   * are met.
   */
  epochs: number;

  /**
   * Number of epochs with no improvement after which
   * training will be stopped.
   *
   * See [`earlyStopping`](https://js.tensorflow.org/api/latest/#callbacks.earlyStopping)
   * for more details.
   */
  patience: number;

  /**
   *
   * The number of units to remember in the Long-Short Term
   * Memory layer.
   *
   * See [`ltsm`](https://js.tensorflow.org/api/latest/#layers.lstm)
   * for more details..
   */
  lstmUnits: number;

  /**
   * The value to use for the
   * [`dropout`](https://js.tensorflow.org/api/latest/#layers.dropout)
   * layer, which is used to prevent over-fitting.
   *
   * This must be a value greater than 0 and less than 1.
   */
  dropout: number;
}

/**
 * Default configuration for training models.
 *
 * See the spam detection paper in deliverables
 * 3 and 4 for a justification of these values.
 *
 * @internal
 */
export const defaultConfig: Config = {
  vocabSize: 5000,
  maxSequenceLength: 1000,
  embeddingDimension: 16,
  trainingRatio: 0.8,
  epochs: 20,
  patience: 3,
  lstmUnits: 10,
  dropout: 0.2,
};
