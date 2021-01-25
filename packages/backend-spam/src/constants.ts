/*
 * CS3099 Group A3
 */

export const constants = {
  modelsPath: `${__dirname}/../models`,
  configName: "configuration.json",
  historyName: "history.json",
  modelName: "model.json",
  tokenizerName: "tokenizer.json",
  sentenceLengthsName: "sentence-lengths.csv",
  wordFrequenciesName: "word-frequencies.csv",
};

export function getModelPath(modelName: string): string {
  return `${constants.modelsPath}/${modelName}`;
}
