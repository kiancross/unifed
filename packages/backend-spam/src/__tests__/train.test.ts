/*
 * CS3099 Group A3
 */

import test from "ava";
import { Message } from "../parsers";
import { trainModels } from "../train";
import { defaultConfig } from "../config";

test("trainModels", async (t) => {
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

  const { value: trainedModel } = await trainModels(["dense"], messages, {
    ...defaultConfig,
    maxSequenceLength: 1,
  }).next();

  t.truthy(trainedModel);
  trainedModel && t.is(trainedModel.name, "dense");
});
