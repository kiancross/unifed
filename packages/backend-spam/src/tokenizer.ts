/*
 * CS3099 Group A3
 */

// Derived from
// https://gist.github.com/dlebech/5bbabaece36753f8a29e7921d8e5bfc7

export type Sequence = number[];

export type StringNumberMapping = [string, number][];

export class Tokenizer {
  wordIndex = new Map<string, number>();
  wordCounts = new Map<string, number>();

  constructor(private readonly vocabSize: number) {}

  static cleanText(text: string): string[] {
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
        .map((value) => value.trim())
        .filter((value) => value !== "")
    );
  }

  fitOnTexts(texts: string[]): void {
    for (const text of texts) {
      const cleanedText = Tokenizer.cleanText(text);
      for (const word of cleanedText) {
        this.wordCounts.set(word, (this.wordCounts.get(word) || 0) + 1);
      }
    }

    Array.from(this.wordCounts.entries())
      .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
      .forEach(([word], i) => {
        if (i + 1 < this.vocabSize || this.vocabSize < 0) {
          this.wordIndex.set(word, i + 1);
        }
      });
  }

  textToSequence(text: string): Sequence {
    return Tokenizer.cleanText(text).map((word) => this.wordIndex.get(word) || 0);
  }

  fromJSON(wordIndex: StringNumberMapping): void {
    this.wordIndex = new Map(wordIndex);
  }

  toJSON(): StringNumberMapping {
    return Array.from(this.wordIndex.entries());
  }
}
