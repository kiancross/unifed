/*
 * Copyright (C) 2021 Kian Cross
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
  arrayToCSV,
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

/**
 * @internal
 */
export type TrainedModelWithMeta = TrainedModel & ModelMeta;

/**
 * Saves a trained model.
 *
 * The output files are the:
 *
 *  - model structure (i.e. layers);
 *  - trained weightings;
 *  - configuration;
 *  - tokenizer;
 *  - history statistics.
 *
 * @param trainedModel  The trained model.
 *
 * @param modelsPath  The path to save the trained model.
 *
 * @internal
 */
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

/**
 * Generates and saves statistical information about
 * the training data.
 *
 * @param sentences  The sentences used for training
 *                   the models.
 *
 * @param path  The path to save the statistical
 *              information.
 *
 * @internal
 */
export async function saveSentencesMeta(sentences: string[], path: string): Promise<void> {
  // -1 creates a tokenizer with infinite vocabulary size.
  const infiniteTokenizer = new Tokenizer(-1);

  infiniteTokenizer.fitOnTexts(sentences);

  // Create a frequency tables of tokens.
  const wordFrequenciesCsv = arrayToCSV(
    Array.from(infiniteTokenizer.wordCounts.values())
      .sort((a, b) => a - b)
      .map((value) => [value]),
  );

  // Create a table of sentence lengths.
  const sentenceLengthsCsv = arrayToCSV(
    sentences
      .map((sentence) => Tokenizer.tokenize(sentence))
      .map((tokens) => tokens.length)
      .sort((a, b) => a - b)
      .map((length) => [length]),
  );

  await fs.writeFile(`${path}/${constants.wordFrequenciesName}`, wordFrequenciesCsv);
  await fs.writeFile(`${path}/${constants.sentenceLengthsName}`, sentenceLengthsCsv);
}

/**
 * Trains models with the given data and given
 * configuration.
 *
 * Creates a generator that yields once each
 * model is trained. This is so that they can
 * be saved individually, in case training is
 * interrupted after many hours.
 *
 * @param modelNames  The names of the models to be
 *                    trained.
 *
 * @param messages  The data used to train the models.
 *
 * @param config  The [[`Config`]] used to train the
 *                models.
 *
 * @internal
 */
export async function* trainModels(
  modelNames: string[],
  messages: Message[],
  config: Config,
): AsyncGenerator<TrainedModelWithMeta, void> {
  const [trainingMessages, testingMessages] = ratioSplitArray(messages, config.trainingRatio);

  const trainingMapping = flattenMessages(trainingMessages);
  const testingMapping = flattenMessages(testingMessages);

  const tokenizer = new Tokenizer(config.vocabSize);
  tokenizer.fitOnTexts(trainingMapping.sentences);

  // Get training tensors.
  const trainingSentencesTensor = getSentencesTensor(
    trainingMapping.sentences,
    tokenizer,
    config.maxSequenceLength,
  );
  const trainingLabelsTensor = getLabelsTensor(trainingMapping.labels);

  // Get testing tensors.
  const testingSentencesTensor = getSentencesTensor(
    testingMapping.sentences,
    tokenizer,
    config.maxSequenceLength,
  );
  const testingLabelsTensor = getLabelsTensor(testingMapping.labels);

  for (const modelName of modelNames) {
    const model = getModel(modelName, config);

    // Displays a summary of the model.
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
    const selectedModelNames = process.argv.slice(2);
    const missingModel = selectedModelNames.find((name) => !modelNames.includes(name));

    // Check that at least one model has been selected.
    if (selectedModelNames.length === 0 || missingModel) {
      console.error(`Please select from any of the following models: ${modelNames.join(", ")}`);
      process.exit(1);
    }

    // Load the data.
    const data = await mergeParsers([
      new SMSParser("data/sms.zip"),
      new EnronParser("data/enron.zip"),
      new SpamAssasinParser("data/spam-assasin.zip"),
    ]);

    util.shuffle(data);

    await createDirectory(constants.modelsPath);

    // Begin training
    const trainedModels = trainModels(selectedModelNames, data, defaultConfig);

    // Use this to store whether we are training the first
    // model or not.
    let firstModel = true;

    for await (const trainedModel of trainedModels) {
      // We only need to save data about the training data
      // once (so do it on the first model).
      if (firstModel) {
        await createDirectory(constants.metaPath);
        saveSentencesMeta(trainedModel.trainingSentences, constants.metaPath);
        firstModel = false;
      }

      await saveModel(trainedModel, constants.modelsPath);
    }
  })();
}
