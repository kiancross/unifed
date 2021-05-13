/*
 * Copyright (C) 2021 Kian Cross
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

// Derived from
// https://gist.github.com/dlebech/5bbabaece36753f8a29e7921d8e5bfc7

import test from "ava";
import { Tokenizer } from "../tokenizer";

test("tokenize empty", (t) => {
  t.deepEqual(Tokenizer.tokenize(""), []);
});

test("tokenize number", (t) => {
  const text = Tokenizer.tokenize("00112233445566778899");

  t.deepEqual(text, ["<<!!__NUMBER__!!>>"]);
});

test("tokenize url with protocol", (t) => {
  const text = Tokenizer.tokenize("http://test.com");

  t.deepEqual(text, ["<<!!__URL__!!>>"]);
});

test("tokenize url with protocol and path", (t) => {
  const text = Tokenizer.tokenize("http://test.com/foo");

  t.deepEqual(text, ["<<!!__URL__!!>>"]);
});

test("tokenize url without protocol", (t) => {
  const text = Tokenizer.tokenize("test.com");

  t.deepEqual(text, ["<<!!__URL__!!>>"]);
});

test("tokenize url without protocol and path", (t) => {
  const text = Tokenizer.tokenize("test.com/foo");

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
