/*
 * CS3099 Group A3
 */

import { tensor2d } from "@tensorflow/tfjs-node";
import { model } from "./model";
import { Message } from "./parsers";
import { Tokenizer } from "./tokenizer";
import { getTensors, getData, flattenMessages, padSequences } from "./tensors";
import { epochs } from "./constants";
import { vocabSize, trainingRatio, maxSequenceLength } from "./constants";

(async () => {
  const data = await getData();

  const index = data.length * trainingRatio;

  const trainingMessages: Message[] = data.slice(0, index);
  const testingMessages: Message[] = data.slice(index);

  const trainingMapping = flattenMessages(trainingMessages);
  const testingMapping = flattenMessages(testingMessages);

  const tokenizer = new Tokenizer(vocabSize);
  tokenizer.fitOnTexts(trainingMapping.sentences);

  const [trainingSentencesTensor, trainingLabelsTensor] = getTensors(trainingMapping, tokenizer);
  const [testingSentencesTensor, testingLabelsTensor] = getTensors(testingMapping, tokenizer);

  model.fit(trainingSentencesTensor, trainingLabelsTensor, {
    epochs,
    validationData: [testingSentencesTensor, testingLabelsTensor],
  });

  await model.save(`file://${__dirname}/model`);

  const testMessage = "This is not spam!!!";

  const sequence = tokenizer.textsToSequences([testMessage]);
  const paddedSequence = padSequences(sequence, maxSequenceLength);

  const result = model.predict(
    tensor2d(paddedSequence, [paddedSequence.length, maxSequenceLength]),
  );

  console.log(result);
})();
