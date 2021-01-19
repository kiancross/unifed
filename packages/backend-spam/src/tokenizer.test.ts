/*
 * CS3099 Group A3
 */

// Derived from
// https://gist.github.com/dlebech/5bbabaece36753f8a29e7921d8e5bfc7

import test from "ava";
import Tokenizer from "./tokenizer";

test("should respect the lower flag", (t) => {
  const texts = ["hello hello Hello"];

  // Test the default assumption
  let tokenizer = new Tokenizer();
  tokenizer.fitOnTexts(texts);
  expect(tokenizer.wordIndex).toEqual({ hello: 1 });

  // Test the lowercase flag
  tokenizer = new Tokenizer({ lower: false });
  tokenizer.fitOnTexts(texts);
  expect(tokenizer.wordIndex).toEqual({ hello: 1, Hello: 2 });
});

it("should tokenize texts and store metadata for the texts", () => {
  const tokenizer = new Tokenizer();
  const texts = [
    "hello hello .,/#!$%^&*;:{}= \\ -_`~() hello Hello world world world",
    "great success .,/#!$%^&*;:{}=\\-_`~()   Success",
  ];
  tokenizer.fitOnTexts(texts);
  const sequences = tokenizer.textsToSequences(texts);

  expect(tokenizer.wordIndex).toEqual({
    hello: 1,
    world: 2,
    success: 3,
    great: 4,
  });

  expect(tokenizer.indexWord).toEqual({
    1: "hello",
    2: "world",
    3: "success",
    4: "great",
  });

  expect(tokenizer.wordCounts).toEqual({
    hello: 4,
    world: 3,
    success: 2,
    great: 1,
  });

  expect(sequences).toEqual([
    [1, 1, 1, 1, 2, 2, 2],
    [4, 3, 3],
  ]);
});
