/*
 * CS3099 Group A3
 */

import { promises as fs } from "fs";
import { util } from "@tensorflow/tfjs-node-gpu";

import { TrainedModel, modelNames, getModel, fitModel } from "./models";
import { Tokenizer } from "./tokenizer";
import { getSentencesTensor, getLabelsTensor } from "./tensor";
import { SMSParser, EnronParser, SpamAssasinParser, Message } from "./parsers";
import { Config, defaultConfig } from "./config";
import * as constants from "./constants";

import {
  arrayToCsv,
  flattenMessages,
  ratioSplitArray,
  mergeParsers,
  createDirectory,
} from "./helpers";

type ModelMeta = {
  tokenizer: Tokenizer;
  config: Config;
  trainingSentences: string[];
  name: string;
};

export type TrainedModelWithMeta = TrainedModel & ModelMeta;

export async function saveModel(
  trainedModel: TrainedModelWithMeta,
  modelsPath: string,
): Promise<void> {
  const path = `${modelsPath}/${trainedModel.name}`;

  await trainedModel.model.save(`file://${path}`);
  await fs.writeFile(`${path}/${constants.historyName}`, JSON.stringify(trainedModel.history));
  await fs.writeFile(`${path}/${constants.configName}`, JSON.stringify(trainedModel.config));
  await fs.writeFile(`${path}/${constants.tokenizerName}`, JSON.stringify(trainedModel.tokenizer));
}

export async function saveMeta(sentences: string[], path: string): Promise<void> {
  const infiniteTokenizer = new Tokenizer(-1);
  infiniteTokenizer.fitOnTexts(sentences);

  const wordFrequenciesCsv = arrayToCsv(
    Array.from(infiniteTokenizer.wordCounts.values())
      .sort((a, b) => a - b)
      .map((value) => [value]),
  );

  const sentenceLengthsCsv = arrayToCsv(
    sentences
      .map((sentence) => Tokenizer.cleanText(sentence))
      .map((tokens) => tokens.length)
      .sort((a, b) => a - b)
      .map((length) => [length]),
  );

  await fs.writeFile(`${path}/${constants.wordFrequenciesName}`, wordFrequenciesCsv);
  await fs.writeFile(`${path}/${constants.sentenceLengthsName}`, sentenceLengthsCsv);
}

export async function* trainModels(
  modelNames: string[],
  data: Message[],
  config: Config,
): AsyncGenerator<TrainedModelWithMeta, void> {
  const [trainingMessages, testingMessages] = ratioSplitArray(data, config.trainingRatio);

  const trainingMapping = flattenMessages(trainingMessages);
  const testingMapping = flattenMessages(testingMessages);

  const tokenizer = new Tokenizer(config.vocabSize);
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

    yield {
      ...trainedModel,
      config,
      tokenizer,
      trainingSentences: trainingMapping.sentences,
      name: modelName,
    };
  }
}

if (require.main === module) {
  (async () => {
    const selectAllToken = "+";
    const selectedModelNames = process.argv.slice(2);
    const missingModel = selectedModelNames.find(
      (name) => ![...modelNames, selectAllToken].includes(name),
    );
    const allModels = selectedModelNames.find((name) => name === selectAllToken);

    if (selectedModelNames.length === 0 || missingModel) {
      console.error(
        `Please select from any of the following models: ${[selectAllToken, ...modelNames].join(", ")}`,
      );
      process.exit(1);
    }

    const data = await mergeParsers([
      new SMSParser("data/sms.zip"),
      new EnronParser("data/enron.zip"),
      new SpamAssasinParser("data/spam-assasin.zip"),
    ]);

    util.shuffle(data);

    await createDirectory(constants.modelsPath);

    const trainedModels = trainModels(allModels ? modelNames : selectedModelNames, data, defaultConfig);
    let firstModel = true;

    for await (const trainedModel of trainedModels) {
      if (firstModel) {
        await createDirectory(constants.metaPath);
        saveMeta(trainedModel.trainingSentences, constants.metaPath);
        firstModel = false;
      }
      await saveModel(trainedModel, constants.modelsPath);
    }
  })();
}
