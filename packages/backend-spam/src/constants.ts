/*
 * CS3099 Group A3
 */

export const vocabSize = 10000;
export const maxSequenceLength = 1000;
export const embeddingDimension = 16;
export const trainingRatio = 0.8;
export const epochs = 10;
export const modelExportPath = `${__dirname}/../model/`;
export const modelImportPath = `${modelExportPath}/model.json`;
export const tokenizerExportPath = `${__dirname}/../model/tokenizer.json`;
export const tokenizerImportPath = tokenizerExportPath;
