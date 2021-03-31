/*
 * CS3099 Group A3
 */

import os from "os";
import fs, { promises as fsPromises } from "fs";
import rawTest, { TestInterface } from "ava";
import { Message } from "../parsers";
import { TrainedModelWithMeta, trainModels, saveModel, saveMeta } from "../train";
import { defaultConfig } from "../config";
import * as constants from "../constants";

const test = rawTest as TestInterface<{ trainedModel: TrainedModelWithMeta }>;

const modelName = "dense";

test.before(async (t) => {
  const messages: Message[] = [
    {
      body: "hello this is a long message",
      spam: false,
    },
    {
      body: "world",
      spam: true,
    },
  ];

  const { value: trainedModel } = await trainModels([modelName], messages, {
    ...defaultConfig,
    maxSequenceLength: 1,
  }).next();

  t.truthy(trainedModel);

  if (trainedModel) {
    t.context.trainedModel = trainedModel;
  }
});

test("trainModels", async (t) => {
  t.truthy(t.context.trainedModel);
  t.is(t.context.trainedModel.name, modelName);
});

test("Save model", async (t) => {
  const path = await fsPromises.mkdtemp(os.tmpdir() + "/");
  await saveModel(t.context.trainedModel, path);

  const modelPath = `${path}/${modelName}`;
  t.true(fs.existsSync(modelPath));
  t.true(fs.existsSync(`${modelPath}/${constants.historyName}`));
  t.true(fs.existsSync(`${modelPath}/${constants.configName}`));
  t.true(fs.existsSync(`${modelPath}/${constants.tokenizerName}`));

  fs.rmdirSync(path, { recursive: true });
});

test("Save meta", async (t) => {
  const path = await fsPromises.mkdtemp(os.tmpdir() + "/");

  const sentences = ["foo bar", "bar baz"];
  await saveMeta(sentences, path);

  t.true(fs.existsSync(path));
  t.true(fs.existsSync(`${path}/${constants.wordFrequenciesName}`));
  t.true(fs.existsSync(`${path}/${constants.sentenceLengthsName}`));

  fs.rmdirSync(path, { recursive: true });
});
