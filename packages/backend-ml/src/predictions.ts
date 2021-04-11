/*
 * CS3099 Group A3
 */

import { promises as fs } from "fs";
import { loadLayersModel, Tensor } from "@tensorflow/tfjs-node-gpu";
import { load as loadToxicity } from "@tensorflow-models/toxicity";

import { Tokenizer, StringNumberMapping } from "./tokenizer";
import { getSentencesTensor } from "./tensor";
import { Config } from "./config";
import * as constants from "./constants";

// Name of the model used to make spam detection
// predictions.
const modelName = "twilio-dense";

const path = `${constants.modelsPath}/${modelName}`;

// Load the saved config file (which might be different to
// defaultConfig).
const config = (async () => {
  return JSON.parse((await fs.readFile(`${path}/${constants.configName}`)).toString()) as Config;
})();

// Load the saved tokenizer.
const tokenizer = (async () => {
  const tokenizerData: StringNumberMapping = JSON.parse(
    (await fs.readFile(`${path}/${constants.tokenizerName}`)).toString(),
  );

  const tokenizer = new Tokenizer((await config).vocabSize);
  tokenizer.fromJSON(tokenizerData);

  return tokenizer;
})();

// Load the text toxicity model.
const toxicityModel = (async () =>
  // 0.8 is the threshold at which each of the categories
  // will be triggered.
  loadToxicity(0.8, [
    "identity_attack",
    "insult",
    "obscene",
    "severe_toxicity",
    "sexual_explicit",
    "threat",
  ]))();

// Load the spam detection model.
const spamModel = (async () => loadLayersModel(`file://${path}/${constants.modelName}`))();

/**
 * Predicts whether or not a given sentence of 'toxic'.
 *
 * Toxic is defined as being any of:
 *
 *  - An identity attack
 *  - Insulting
 *  - Obscene
 *  - Sexually explicit
 *  - Threatening
 *
 * @param sentence  The sentence to classify.
 *
 * @returns A boolean indicating if the sentence was classified as
 *          toxic.
 */
export async function getToxicityClassification(sentence: string): Promise<boolean> {
  const predictions = await (await toxicityModel).classify([sentence]);

  // Check if any of the predictions were positive.
  return predictions.some((prediction) => prediction.results.some((result) => result.match));
}

/**
 * Predicts the likelihood that a given sentence is spam.
 *
 * @param sentence  The sentence to generate a prediction for.
 *
 * @returns A number between 0 and 1, indicating how likely the
 *          given sentence is to be non-spam or spam respectively.
 */
export async function getSpamFactor(sentence: string): Promise<number> {
  const sentenceTensor = getSentencesTensor(
    [sentence],
    await tokenizer,
    (await config).maxSequenceLength,
  );

  const result = (await spamModel).predict(sentenceTensor) as Tensor;

  return (await result.data())[0];
}
