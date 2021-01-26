/*
 * CS3099 Group A3
 */

// Derived from
// https://gist.github.com/dlebech/5bbabaece36753f8a29e7921d8e5bfc7

import test from "ava";
import { Tokenizer } from "../tokenizer";

test("cleanText empty", (t) => {
  t.deepEqual(Tokenizer.cleanText(""), []);
});

test("cleanText number", (t) => {
  const text = Tokenizer.cleanText("00112233445566778899");

  t.deepEqual(text, ["<<!!__NUMBER__!!>>"]);
});

test("cleanText url with protocol", (t) => {
  const text = Tokenizer.cleanText("http://test.com");

  t.deepEqual(text, ["<<!!__URL__!!>>"]);
});

test("cleanText url with protocol and path", (t) => {
  const text = Tokenizer.cleanText("http://test.com/foo");

  t.deepEqual(text, ["<<!!__URL__!!>>"]);
});

test("cleanText url without protocol", (t) => {
  const text = Tokenizer.cleanText("test.com");

  t.deepEqual(text, ["<<!!__URL__!!>>"]);
});

test("cleanText url without protocol and path", (t) => {
  const text = Tokenizer.cleanText("test.com/foo");

  t.deepEqual(text, ["<<!!__URL__!!>>"]);
});

test("fitOnTexts wordCounts", (t) => {
  const tokenizer = new Tokenizer(3);

  tokenizer.fitOnTexts(["foo bar", "bar baz"]);

  t.deepEqual(Array.from(tokenizer.wordCounts.entries()), [
    ["foo", 1],
    ["bar", 2],
    ["baz", 1],
  ]);
});

test("fitOnTexts vocabSize", (t) => {
  const tokenizer = new Tokenizer(3);

  tokenizer.fitOnTexts(["foo bar", "bar baz"]);

  t.deepEqual(Array.from(tokenizer.wordIndex.entries()), [
    ["bar", 1],
    ["foo", 2],
  ]);
  t.deepEqual(Array.from(tokenizer.wordCounts.entries()), [
    ["foo", 1],
    ["bar", 2],
    ["baz", 1],
  ]);
});

test("fitOnTexts toJSON", (t) => {
  const tokenizer = new Tokenizer(3);

  tokenizer.fitOnTexts(["foo bar", "bar baz"]);

  t.deepEqual(tokenizer.toJSON(), [
    ["bar", 1],
    ["foo", 2],
  ]);
});

test("fitOnTexts fromJSON", (t) => {
  const tokenizer = new Tokenizer(3);

  tokenizer.fitOnTexts(["foo bar", "bar baz"]);

  const json = tokenizer.toJSON();

  const newTokenizer = new Tokenizer(3);
  newTokenizer.fromJSON(json);

  t.deepEqual(newTokenizer.toJSON(), [
    ["bar", 1],
    ["foo", 2],
  ]);
});

test("textToSequence empty", (t) => {
  const tokenizer = new Tokenizer(3);

  tokenizer.fitOnTexts(["foo bar", "bar baz"]);

  t.deepEqual(tokenizer.textToSequence(""), []);
});

test("textToSequence valid", (t) => {
  const tokenizer = new Tokenizer(3);

  tokenizer.fitOnTexts(["foo bar", "bar baz"]);

  t.deepEqual(tokenizer.textToSequence("foo bar baz"), [2, 1, 0]);
});

test("textToSequence whitespace", (t) => {
  const tokenizer = new Tokenizer(3);

  tokenizer.fitOnTexts(["foo bar", "bar baz"]);

  t.deepEqual(tokenizer.textToSequence("foo bar\n\n\n"), [2, 1]);
});

test("textToSequence reserved word", (t) => {
  const tokenizer = new Tokenizer(1);

  tokenizer.fitOnTexts(["constructor"]);

  t.deepEqual(tokenizer.textToSequence("constructor"), [0]);
});
