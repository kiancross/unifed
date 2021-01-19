/*
 * CS3099 Group A3
 */

import { layers, sequential, train } from "@tensorflow/tfjs-node";
import { SmsParser, EnronParser, SpamAssasinParser, mergeMessageSets } from "./parsers";

const model = sequential();

const vocabSize = 10000;
const maxLength = 1000;
const embeddingDimension = 16;

model.add(
  layers.embedding({ inputDim: vocabSize, outputDim: embeddingDimension, inputLength: maxLength }),
);
model.add(layers.flatten());
model.add(layers.dense({ units: 6, activation: "relu" }));
model.add(layers.dense({ units: 1, activation: "sigmoid" }));

model.compile({ optimizer: train.adam(), loss: "binaryCrossentropy", metrics: ["accuracy"] });

model.summary();

(async () => {
  const sms = new SmsParser("data/sms.zip");
  const enron = new EnronParser("data/enron.zip");
  const spamAssasin = new SpamAssasinParser("data/spam-assasin.zip");

  const smsMessages = await sms.getMessages();
  const enronMessages = await enron.getMessages();
  const spamAssasinMessages = await spamAssasin.getMessages();

  const mergedMessages = mergeMessageSets([smsMessages, enronMessages, spamAssasinMessages]);
})();
