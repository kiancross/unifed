/*
 * CS3099 Group A3
 */

// Derived from
// https://gist.github.com/dlebech/5bbabaece36753f8a29e7921d8e5bfc7

import rawTest, { TestInterface } from "ava";
import { Tokenizer } from "../tokenizer";

interface Context {
  tokenizer: Tokenizer;
}

const test = rawTest as TestInterface<Context>;

test.beforeEach((t) => {
  t.context.tokenizer = new Tokenizer(10000);
});

test("fitOnTexts empty", (t) => {
  const tokenizer = t.context.tokenizer;

  tokenizer.fitOnTexts([]);

  t.deepEqual(tokenizer.wordIndex, {});
});

test("fitOnTexts number", (t) => {
  const tokenizer = t.context.tokenizer;

  tokenizer.fitOnTexts(["00112233445566778899"]);

  t.deepEqual(tokenizer.wordIndex, { "<<!!__NUMBER__!!>>": 1 });
});

test("fitOnTexts url with protocol", (t) => {
  const tokenizer = t.context.tokenizer;

  tokenizer.fitOnTexts(["http://test.com"]);

  t.deepEqual(tokenizer.wordIndex, { "<<!!__URL__!!>>": 1 });
});

test("fitOnTexts url with protocol and path", (t) => {
  const tokenizer = t.context.tokenizer;

  tokenizer.fitOnTexts(["http://test.com/foo"]);

  t.deepEqual(tokenizer.wordIndex, { "<<!!__URL__!!>>": 1 });
});

test("fitOnTexts url without protocol", (t) => {
  const tokenizer = t.context.tokenizer;

  tokenizer.fitOnTexts(["test.com"]);

  t.deepEqual(tokenizer.wordIndex, { "<<!!__URL__!!>>": 1 });
});

test("fitOnTexts url without protocol and path", (t) => {
  const tokenizer = t.context.tokenizer;

  tokenizer.fitOnTexts(["test.com/foo"]);

  t.deepEqual(tokenizer.wordIndex, { "<<!!__URL__!!>>": 1 });
});
