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
 * Path to save models.
 *
 * @internal
 */
export const modelsPath = `${__dirname}/../models`;

/**
 * Path to save metadata.
 *
 * @internal
 */
export const metaPath = `${__dirname}/../meta`;

/**
 * Name of configuration file containing
 * the [[`Config`]] used to train the model.
 *
 * @internal
 */
export const configName = "configuration.json";

/**
 * Name of the file containing the statistics
 * from training the model, such as losses and
 * accuracy.
 *
 * @internal
 */
export const historyName = "history.json";

/**
 * Name of the file used to save the model
 * information, such as layers.
 *
 * @internal
 */
export const modelName = "model.json";

/**
 * Name of the file to save the serialised tokenizer.
 *
 * @internal
 */
export const tokenizerName = "tokenizer.json";

/**
 * Name of file the file to save the sentence lengths
 * statistics.
 *
 * @internal
 */
export const sentenceLengthsName = "sentence-lengths.dat";

/**
 * Name of file the file to save the worth frequency
 * statistics.
 *
 * @internal
 */
export const wordFrequenciesName = "word-frequencies.dat";

/**
 * Name of file the file to save the testing
 * results for spam posts.
 *
 * @internal
 */
export const testingResultsSpamName = "testing-results-spam.dat";

/**
 * Name of file the file to save the testing
 * results for non-spam posts.
 *
 * @internal
 */
export const testingResultsHamName = "testing-results-ham.dat";
