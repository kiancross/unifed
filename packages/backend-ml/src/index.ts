/*
 * CS3099 Group A3
 */

import { promises as fs } from "fs";
import { loadLayersModel, Tensor } from "@tensorflow/tfjs-node-gpu";
import { Tokenizer, StringNumberMapping } from "./tokenizer";
import { getSentencesTensor } from "./tensor";
import { Config } from "./config";
import { getModelPath, constants } from "./constants";

const modelName = "dense";
const path = getModelPath(modelName);

const config = (async () => {
  return JSON.parse((await fs.readFile(`${path}/${constants.configName}`)).toString()) as Config;
})();

const tokenizer = (async () => {
  const tokenizerData: StringNumberMapping = JSON.parse(
    (await fs.readFile(`${path}/${constants.tokenizerName}`)).toString(),
  );

  const tokenizer = new Tokenizer((await config).vocabSize);
  tokenizer.fromJSON(tokenizerData);

  return tokenizer;
})();

const model = (async () => {
  return await loadLayersModel(`file://${path}/${constants.modelName}`);
})();

export const getSpamFactor = async (sentence: string): Promise<number> => {
  const sentenceTensor = getSentencesTensor(
    [sentence],
    await tokenizer,
    (await config).maxSequenceLength,
  );

  const result = (await model).predict(sentenceTensor) as Tensor;

  return (await result.data())[0];
};
