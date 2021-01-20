/*
 * CS3099 Group A3
 */

import { model } from "./model";
import { Tokenizer } from "./tokenizer";
import { getData, flattenMessages, ratioSplitMessages } from "./data";
import { getSentencesTensor, getLabelsTensor } from "./tensor";
import {
  vocabSize,
  trainingRatio,
  epochs,
  modelExportPath,
  tokenizerExportPath,
} from "./constants";

(async () => {
  const data = await getData();

  const [trainingMessages, testingMessages] = ratioSplitMessages(data, trainingRatio);

  const trainingMapping = flattenMessages(trainingMessages);
  const testingMapping = flattenMessages(testingMessages);

  const tokenizer = new Tokenizer(vocabSize);
  tokenizer.fitOnTexts(trainingMapping.sentences);

  const trainingSentencesTensor = getSentencesTensor(trainingMapping.sentences, tokenizer);
  const trainingLabelsTensor = getLabelsTensor(trainingMapping.labels);

  const testingSentencesTensor = getSentencesTensor(testingMapping.sentences, tokenizer);
  const testingLabelsTensor = getLabelsTensor(testingMapping.labels);

  await model.fit(trainingSentencesTensor, trainingLabelsTensor, {
    epochs,
    validationData: [testingSentencesTensor, testingLabelsTensor],
  });

  await model.save(`file://${modelExportPath}`);
  await tokenizer.save(tokenizerExportPath);
})();
