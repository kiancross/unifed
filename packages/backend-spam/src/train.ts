/*
 * CS3099 Group A3
 */

import { promises as fs } from "fs";
import { TrainedModel, models, getModel, fitModel } from "./models";
import { Tokenizer } from "./tokenizer";
import { getData, flattenMessages, ratioSplitMessages } from "./data";
import { getSentencesTensor, getLabelsTensor } from "./tensor";
import { defaultConfig as config } from "./config";
import { getModelPath, constants } from "./constants";

type NamedTrainedModel = TrainedModel & { name: string };

async function trainModels(
  modelNames: string[],
  tokenizer: Tokenizer,
): Promise<NamedTrainedModel[]> {
  const data = await getData();

  const [trainingMessages, testingMessages] = ratioSplitMessages(data, config.trainingRatio);

  const trainingMapping = flattenMessages(trainingMessages);
  const testingMapping = flattenMessages(testingMessages);

  tokenizer.fitOnTexts(trainingMapping.sentences);

  const trainingSentencesTensor = getSentencesTensor(
    trainingMapping.sentences,
    tokenizer,
    config.maxSequenceLength,
  );
  const trainingLabelsTensor = getLabelsTensor(trainingMapping.labels);

  const testingSentencesTensor = getSentencesTensor(
    testingMapping.sentences,
    tokenizer,
    config.maxSequenceLength,
  );
  const testingLabelsTensor = getLabelsTensor(testingMapping.labels);

  const trainedModels: NamedTrainedModel[] = [];

  for (const modelName of modelNames) {
    const model = getModel(modelName, config);

    model.summary();

    const trainedModel = await fitModel(
      model,
      trainingSentencesTensor,
      trainingLabelsTensor,
      testingSentencesTensor,
      testingLabelsTensor,
      config,
    );

    trainedModels.push({ ...trainedModel, name: modelName });
  }

  return trainedModels;
}

(async () => {
  const selectedModelNames = process.argv.slice(2);
  const missingModel = selectedModelNames.find((name) => !models.includes(name));
  const allModels = selectedModelNames.find((name) => name === "*");

  if (selectedModelNames.length === 0 || missingModel) {
    console.error(`Please select from any of the following models: ${["*", ...models].join(", ")}`);
    process.exit(1);
  }

  const tokenizer = new Tokenizer(config.vocabSize);

  const trainedModels = await trainModels(allModels ? models : selectedModelNames, tokenizer);

  for (const trainedModel of trainedModels) {
    const path = getModelPath(trainedModel.name);

    await trainedModel.model.save(`file://${path}`);
    await fs.writeFile(`${path}/${constants.historyName}`, JSON.stringify(trainedModel.history));
    await fs.writeFile(`${path}/${constants.configName}`, JSON.stringify(config));
    await fs.writeFile(`${path}/${constants.tokenizerName}`, JSON.stringify(tokenizer));
  }
})();
