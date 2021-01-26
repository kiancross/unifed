/*
 * CS3099 Group A3
 */

import test from "ava";
import { Message } from "../parsers";
import { getLengthFrequencies, arrayToCsv, flattenMessages, ratioSplitMessages } from "../helpers";

test("getLengthFrequencies empty", (t) => {
  t.deepEqual(getLengthFrequencies([]), {});
});

test("getLengthFrequencies valid", (t) => {
  const sentences = [
    "one",
    "two two",
    "two two",
    "three three three",
    "three three three",
    "three three three",
    "four four four four",
    "four four four four",
  ];

  const frequencies = getLengthFrequencies(sentences);

  t.deepEqual(frequencies, {
    1: 1,
    2: 2,
    3: 3,
    4: 2,
  });
});

test("arrayToCsv empty", (t) => {
  t.is(arrayToCsv([]), "");
});

test("arrayToCsv one row", (t) => {
  t.is(arrayToCsv([["hello", 1]]), "hello,1");
});

test("arrayToCsv two rows", (t) => {
  t.is(
    arrayToCsv([
      ["hello", 1],
      ["world", 2],
    ]),
    "hello,1\nworld,2",
  );
});

test("flattenMessages empty", (t) => {
  t.deepEqual(flattenMessages([]), { sentences: [], labels: [] });
});

test("flattenMessages valid", (t) => {
  const message1: Message = {
    body: "message1",
    spam: false,
  };
  const message2: Message = {
    body: "message2",
    spam: true,
  };

  t.deepEqual(flattenMessages([message1, message2]), {
    sentences: [message1.body, message2.body],
    labels: [0, 1],
  });
});

test("ratioSplitMessages empty", (t) => {
  t.deepEqual(ratioSplitMessages([], 0.5), [[], []]);
});

test("ratioSplitMessages floor", (t) => {
  const message1: Message = {
    body: "message1",
    spam: false,
  };
  const message2: Message = {
    body: "message2",
    spam: true,
  };

  t.deepEqual(ratioSplitMessages([message1, message2], 0.99), [[message1], [message2]]);
});
