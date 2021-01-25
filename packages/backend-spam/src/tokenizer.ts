/*
 * CS3099 Group A3
 */

import { promises as fs } from "fs";

// Derived from
// https://gist.github.com/dlebech/5bbabaece36753f8a29e7921d8e5bfc7

export type Sequence = number[];

interface StringNumberMapping {
  [key: string]: number;
}

export class Tokenizer {
  wordIndex: StringNumberMapping = {};

  constructor(private readonly vocabSize: number) {}

  private cleanText(text: string): string[] {
    const urlToken = "\x80";

    return (
      text
        .toLowerCase()
        .replace(/[^\x00-\x7F]/g, "") // eslint-disable-line no-control-regex
        // Taken from https://stackoverflow.com/a/3809435/3250233
        .replace(
          /(?:https?:\/\/)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&//=]*/g,
          urlToken,
        )
        .replace(/[\\.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .replace(/[0-9]+/g, "<<!!__NUMBER__!!>>")
        .replace(urlToken, "<<!!__URL__!!>>")
        .replace(/\s{2,}/g, " ")
        .split(" ")
    );
  }

  fitOnTexts(texts: string[]): void {
    const wordCounts: StringNumberMapping = {};

    for (const text of texts) {
      const cleanedText = this.cleanText(text);
      for (const word of cleanedText) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    }

    Object.entries(wordCounts)
      .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
      .forEach(([word], i) => {
        if (i + 1 < this.vocabSize) {
          this.wordIndex[word] = i + 1;
        }
      });
  }

  textToSequence(text: string): Sequence {
    return this.cleanText(text).map((word) => this.wordIndex[word] || 0);
  }

  async save(path: string): Promise<void> {
    await fs.writeFile(path, JSON.stringify(this));
  }

  async load(path: string): Promise<void> {
    const data = (await fs.readFile(path)).toString();
    this.fromJSON(JSON.parse(data));
  }

  fromJSON(wordIndex: StringNumberMapping): void {
    this.wordIndex = wordIndex;
  }

  toJSON(): StringNumberMapping {
    return this.wordIndex;
  }
}
