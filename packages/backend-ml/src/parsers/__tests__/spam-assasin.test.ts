/*
 * CS3099 Group A3
 */

import test from "ava";
import { SpamAssasinParser } from "../spam-assasin-parser";

test("Parse valid", async (t) => {
  const parser = new SpamAssasinParser(`${__dirname}/data/spam-assasin-valid.zip`);
  const messages = await parser.getMessages();

  t.deepEqual(messages, [
    { body: "hamMessage", spam: false },
    { body: "spamMessage", spam: true },
  ]);
});
