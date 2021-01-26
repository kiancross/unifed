/*
 * CS3099 Group A3
 */

import { promises as fs } from "fs";
//import { util } from "@tensorflow/tfjs-node-gpu";
import { TrainedModel, models, getModel, fitModel } from "./models";
import { Tokenizer } from "./tokenizer";
import { getSentencesTensor, getLabelsTensor } from "./tensor";
import { /*SmsParser, EnronParser,*/ SpamAssasinParser, Message } from "./parsers";
import { Config, defaultConfig } from "./config";
import { getModelPath, constants } from "./constants";
import {
  getLengthFrequencies,
  arrayToCsv,
  flattenMessages,
  ratioSplitMessages,
  mergeParsers,
  createDirectory,
} from "./helpers";

type ModelMeta = {
  tokenizer: Tokenizer;
  config: Config;
  trainingSentences: string[];
  name: string;
};
type TrainedModelWithMeta = TrainedModel & ModelMeta;

async function saveModel(trainedModel: TrainedModelWithMeta): Promise<void> {
  const path = getModelPath(trainedModel.name);

  await trainedModel.model.save(`file://${path}`);
  await fs.writeFile(`${path}/${constants.historyName}`, JSON.stringify(trainedModel.history));
  await fs.writeFile(`${path}/${constants.configName}`, JSON.stringify(trainedModel.config));
  await fs.writeFile(`${path}/${constants.tokenizerName}`, JSON.stringify(trainedModel.tokenizer));
}

async function saveMeta(sentences: string[]): Promise<void> {
  const infiniteTokenizer = new Tokenizer(-1);
  infiniteTokenizer.fitOnTexts(sentences);

  const wordFrequencies = Object.entries(infiniteTokenizer.wordIndex).sort((a, b) => a[1] - b[1]);
  const wordFrequenciesCsv = arrayToCsv(wordFrequencies); // fix line breaks

  const sentenceLengths = getLengthFrequencies(sentences);
  const sentenceLengthsCsv = arrayToCsv(
    ((Object.entries(sentenceLengths) as [unknown, number][]) as [number, number][]).sort(
      (a, b) => a[0] - b[0],
    ),
  );

  await fs.writeFile(
    `${constants.modelsPath}/${constants.wordFrequenciesName}`,
    wordFrequenciesCsv,
  );
  await fs.writeFile(
    `${constants.modelsPath}/${constants.sentenceLengthsName}`,
    sentenceLengthsCsv,
  );
}

export async function* trainModels(
  modelNames: string[],
  data: Message[],
  config: Config,
): AsyncGenerator<TrainedModelWithMeta, void> {
  const [trainingMessages, testingMessages] = ratioSplitMessages(data, config.trainingRatio);

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

  try {
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
  } catch (error) {
    trainingSentencesTensor.dataSync().forEach((value: number) => {
      if (value > 5000 || value < 0) {
        throw new Error();
      }
    });
    testingSentencesTensor.dataSync().forEach((value: number) => {
      if (value > 5000 || value < 0) {
        throw new Error();
      }
    });
    testingLabelsTensor.dataSync().forEach((value: number) => {
      if (value > 5000 || value < 0) {
        throw new Error();
      }
    });
    trainingLabelsTensor.dataSync().forEach((value: number) => {
      if (value > 5000 || value < 0) {
        throw new Error();
      }
    });
    throw error;
  }
}

if (require.main === module) {
  (async () => {
    const selectedModelNames = process.argv.slice(2);
    const missingModel = selectedModelNames.find((name) => !models.includes(name));
    const allModels = selectedModelNames.find((name) => name === "*");

    if (selectedModelNames.length === 0 || missingModel) {
      console.error(
        `Please select from any of the following models: ${["*", ...models].join(", ")}`,
      );
      process.exit(1);
    }

    function sfc32(a: number, b: number, c: number, d: number) {
      return function () {
        a >>>= 0;
        b >>>= 0;
        c >>>= 0;
        d >>>= 0;
        let t = (a + b) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        d = (d + 1) | 0;
        t = (t + d) | 0;
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    }

    function shuffleArray<T>(array: T[]) {
      const rand = sfc32(0x9e3779b9, 0x243f6a88, 0xb7e15162, 13 ^ 0xdeadbeef);
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    //new EnronParser("data/enron.zip");
    //new SmsParser("data/sms.zip");

    const data = await mergeParsers([new SpamAssasinParser("data/spam-assasin.zip")]);

    //util.shuffle(data);
    shuffleArray(data);

    await createDirectory(constants.modelsPath);

    const trainedModels = trainModels(allModels ? models : selectedModelNames, data, defaultConfig);
    let firstModel = true;

    for await (const trainedModel of trainedModels) {
      if (firstModel) {
        saveMeta(trainedModel.trainingSentences);
        firstModel = true;
      }
      await saveModel(trainedModel);
    }
  })();
}
