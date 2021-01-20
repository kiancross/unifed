/*
 * CS3099 Group A3
 */

// The raw vocabSize    144892
// Occurs more than once  3792
export const vocabSize = 5000;

// Average length for all         212
// Average excluding SMS          241
export const maxSequenceLength = 1000;

export const embeddingDimension = 16;
export const trainingRatio = 0.8;
export const epochs = 50;
export const patience = 3;
export const lstmUnits = 20;
export const dropout = 0.2;
export const modelExportPath = `${__dirname}/../model/`;
export const modelImportPath = `${modelExportPath}/model.json`;
export const tokenizerExportPath = `${__dirname}/../model/tokenizer.json`;
export const tokenizerImportPath = tokenizerExportPath;
