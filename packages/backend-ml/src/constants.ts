/*
 * CS3099 Group A3
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
