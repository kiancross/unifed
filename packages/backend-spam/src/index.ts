/*
 * CS3099 Group A3
 */

import { promises as fs } from "fs";
import { loadLayersModel } from "@tensorflow/tfjs-node-gpu";
import { Tokenizer, StringNumberMapping } from "./tokenizer";
import { getSentencesTensor } from "./tensor";
import { Config } from "./config";
import { getModelPath, constants } from "./constants";

const modelName = "dense";

(async () => {
  const path = getModelPath(modelName);

  const model = await loadLayersModel(`file://${path}/${constants.modelName}`);

  const config: Config = JSON.parse(
    (await fs.readFile(`${path}/${constants.configName}`)).toString(),
  );

  const tokenizerData: StringNumberMapping = JSON.parse(
    (await fs.readFile(`${path}/${constants.tokenizerName}`)).toString(),
  );

  const tokenizer = new Tokenizer(config.vocabSize);
  tokenizer.fromJSON(tokenizerData);

  const sentencesTensor = getSentencesTensor(
    [
      "The dog is in the garden.",
      "Contact our HR firm to earn money from home.",
      "You have won a prize!",
      "I am going to sell you something today.",
      "Contact us to win",
    ],
    tokenizer,
    config.maxSequenceLength,
  );

  const result = model.predict(sentencesTensor);
  console.log(result.toString());
})();
