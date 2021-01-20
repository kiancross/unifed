/*
 * CS3099 Group A3
 */

import { model, fitModel } from "./models";
import { Tokenizer } from "./tokenizer";
import { getData, flattenMessages, ratioSplitMessages } from "./data";
import { getSentencesTensor, getLabelsTensor } from "./tensor";
import { vocabSize, trainingRatio, modelExportPath, tokenizerExportPath } from "./constants";

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

  const history = await fitModel(
    trainingSentencesTensor,
    trainingLabelsTensor,
    testingSentencesTensor,
    testingLabelsTensor,
  );

  console.log(history.history);

  await model.save(`file://${modelExportPath}`);
  await tokenizer.save(tokenizerExportPath);
})();
