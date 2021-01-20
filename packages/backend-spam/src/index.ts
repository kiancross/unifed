/*
 * CS3099 Group A3
 */

import { loadLayersModel } from "@tensorflow/tfjs-node-gpu";
import { Tokenizer } from "./tokenizer";
import { getSentencesTensor } from "./tensor";
import { vocabSize, tokenizerImportPath, modelImportPath } from "./constants";

(async () => {
  const model = await loadLayersModel(`file://${modelImportPath}`);
  const tokenizer = new Tokenizer(vocabSize);
  await tokenizer.load(tokenizerImportPath);

  const sentencesTensor = getSentencesTensor(
    ["The dog is in the garden.", "Contact our HR firm to earn money from home."],
    tokenizer,
  );

  const result = model.predict(sentencesTensor);
  console.log(result.toString());
})();
