/*
 * CS3099 Group A3
 */

// Derived from
// https://gist.github.com/dlebech/5bbabaece36753f8a29e7921d8e5bfc7

interface Config {
  filters?: RegExp;
  lower?: boolean;
}

class Tokenizer {
  private filters: RegExp;
  private lower: boolean;

  constructor(config: Config = {}) {
    this.filters = config.filters || /[\\.,/#!$%^&*;:{}=\-_`~()]/g;
    this.lower = typeof config.lower === "undefined" ? true : config.lower;

    // Primary indexing methods. Word to index and index to word.
    this.wordIndex = {};
    this.indexWord = {};

    // Keeping track of word counts
    this.wordCounts = {};
  }

  private cleanText(text: string): string[] {
    if (this.lower) text = text.toLowerCase();
    return text
      .replace(this.filters, "")
      .replace(/\s{2,}/g, " ")
      .split(" ");
  }

  fitOnTexts(texts) {
    texts.forEach((text) => {
      text = this.cleanText(text);
      text.forEach((word) => {
        this.wordCounts[word] = (this.wordCounts[word] || 0) + 1;
      });
    });

    Object.entries(this.wordCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([word, number], i) => {
        this.wordIndex[word] = i + 1;
        this.indexWord[i + 1] = word;
      });
  }

  textsToSequences(texts: string[]) {
    return texts.map((text) => this.cleanText(text).map((word) => this.wordIndex[word] || 0));
  }
}
