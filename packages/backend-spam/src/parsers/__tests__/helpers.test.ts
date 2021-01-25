/*
 * CS3099 Group A3
 */

import test from "ava";

import { Message, mergeMessageSets } from "../helpers";

test("Merge messages", (t) => {
  const message1: Message = { body: "a", spam: true };
  const message2: Message = { body: "b", spam: false };

  const merged = mergeMessageSets([[message1], [message2]]);

  t.deepEqual(merged, [message1, message2]);
});
