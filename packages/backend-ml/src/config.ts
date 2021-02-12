/*
 * CS3099 Group A3
 */

export interface Config {
  vocabSize: number;
  maxSequenceLength: number;
  embeddingDimension: number;
  trainingRatio: number;
  epochs: number;
  patience: number;
  lstmUnits: number;
  dropout: number;
}

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
