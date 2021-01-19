/*
 * CS3099 Group A3
 */

// Derived from
// https://gist.github.com/dlebech/5bbabaece36753f8a29e7921d8e5bfc7

interface StringNumberMapping {
  [key: string]: number;
}

export class Tokenizer {
  readonly wordCounts: StringNumberMapping = {};
  readonly wordIndex: StringNumberMapping = {};

  constructor(private readonly vocabSize: number) {}

  private cleanText(text: string): string[] {
    text = text.toLowerCase();
    return text
      .replace(/[\\.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .replace(/\s{2,}/g, " ")
      .split(" ");
  }

  fitOnTexts(texts: string[]): void {
    for (const text of texts) {
      const cleanedText = this.cleanText(text);
      for (const word of cleanedText) {
        this.wordCounts[word] = (this.wordCounts[word] || 0) + 1;
      }
    }

    Object.entries(this.wordCounts)
      .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
      .forEach(([word], i) => {
        this.wordIndex[word] = i + 1 > this.vocabSize - 1 ? 0 : i + 1;
      });
  }

  textsToSequences(texts: string[]): number[][] {
    return texts.map((text) => this.cleanText(text).map((word) => this.wordIndex[word] || 0));
  }
}
