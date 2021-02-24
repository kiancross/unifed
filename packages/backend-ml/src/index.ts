/*
 * CS3099 Group A3
 */

import { promises as fs } from "fs";
import { loadLayersModel, Tensor } from "@tensorflow/tfjs-node-gpu";
import { load as loadToxicity } from "@tensorflow-models/toxicity";
import { Tokenizer, StringNumberMapping } from "./tokenizer";
import { getSentencesTensor } from "./tensor";
import { Config } from "./config";
import { constants } from "./constants";

const modelName = "twilio-dense";
const path = `${constants.modelsPath}/${modelName}`;

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

const toxicityModel = (async () =>
  loadToxicity(0.8, [
    "identity_attack",
    "insult",
    "obscene",
    "severe_toxicity",
    "sexual_explicit",
    "threat",
  ]))();

const spamModel = (async () => loadLayersModel(`file://${path}/${constants.modelName}`))();

export const getToxicityClassification = async (sentence: string): Promise<boolean> => {
  const predictions = await (await toxicityModel).classify([sentence]);

  return predictions.some((prediction) => prediction.results.some((result) => result.match));
};

export const getSpamFactor = async (sentence: string): Promise<number> => {
  const sentenceTensor = getSentencesTensor(
    [sentence],
    await tokenizer,
    (await config).maxSequenceLength,
  );

  const result = (await spamModel).predict(sentenceTensor) as Tensor;

  return (await result.data())[0];
};
