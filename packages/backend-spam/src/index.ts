/*
 * CS3099 Group A3
 */

import { loadLayersModel } from "@tensorflow/tfjs-node";
import { Tokenizer } from "./tokenizer";
import { getSentencesTensor } from "./tensor";
import { vocabSize, tokenizerImportPath, modelImportPath } from "./constants";

(async () => {
  const model = await loadLayersModel(`file://${modelImportPath}`);
  const tokenizer = new Tokenizer(vocabSize);
  await tokenizer.load(tokenizerImportPath);

  const sentencesTensor = getSentencesTensor(
    [
      "You are awarded a Nikon Digital Camera. Call now",
      "You have won a free holiday to disneyland. Click here.",
      "my name is kian and I like cheese.",
    ],
    tokenizer,
  );

  const result = model.predict(sentencesTensor);
  console.log(result.toString());
})();
