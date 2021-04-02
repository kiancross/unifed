/*
 * CS3099 Group A3
 */

/**
 * Type representing a numerical sequence.
 *
 * See [[`Tokenizer`]] for usage example.
 *
 * @internal
 */
export type Sequence = number[];

/**
 * Type representing a string to number mapping.
 *
 * See [[`Tokenizer`]] for usage example.
 *
 * @internal
 */
export type StringNumberMapping = [string, number][];

/**
 * Implementation of a tokenizer derived from
 * [here](https://gist.github.com/dlebech/5bbabaece36753f8a29e7921d8e5bfc7).
 *
 * Used to convert a string into a sequence of numbers,
 * where smaller numbers indicate more frequently occurring
 * tokens.
 *
 * @internal
 */
export class Tokenizer {
  /**
   * A mapping between words (tokens) and their corresponding
   * index.
   */
  wordIndex = new Map<string, number>();

  /**
   * A mapping between words (tokens) and their corresponding
   * frequencies.
   */
  wordCounts = new Map<string, number>();

  /**
   * @param vocabSize  The maximum size of the vocabulary.
   */
  constructor(private readonly vocabSize: number) {}

  /**
   * Converts a string into an array of tokens.
   *
   * The following rules are followed:
   *
   *  - Multiple spaces are collapsed into a single space.
   *  - Special characters are removed.
   *  - Numbers are replaced with a single token.
   *  - URLs are replaced with a single token.
   *  - Tokens are split at white space.
   *
   * @param text  The raw string.
   *
   * @returns An array of tokens.
   */
  static tokenize(text: string): string[] {
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

  /**
   * Fits the tokenizer to a given set of strings.
   * The frequency that tokens appear in these model
   * strings will be used when generating sequences
   * for unknown strings.
   *
   * @param texts  The strings to fit the tokenizer
   *               with.
   */
  fitOnTexts(texts: string[]): void {
    for (const text of texts) {
      const tokens = Tokenizer.tokenize(text);

      for (const word of tokens) {
        // Construct a frequency table for each token.
        this.wordCounts.set(word, (this.wordCounts.get(word) || 0) + 1);
      }
    }

    Array.from(this.wordCounts.entries())
      // Sort the frequency table from most frequent to
      // least frequent.
      .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
      // Use the index of the sorted table as the corresponding
      // index for the token.
      .forEach(([word], i) => {
        if (i + 1 < this.vocabSize || this.vocabSize < 0) {
          this.wordIndex.set(word, i + 1);
        }
      });
  }

  /**
   * Tokenizes a given string.
   *
   * @param text  The string to tokenize.
   *
   * @returns The tokenized string.
   */
  textToSequence(text: string): Sequence {
    // If an entry does not exist for the token, set it to 0.
    return Tokenizer.tokenize(text).map((word) => this.wordIndex.get(word) || 0);
  }

  /**
   * Loads a tokenizer from a given object.
   *
   * @param wordIndex  The object to loads the tokenizer from.
   */
  fromJSON(wordIndex: StringNumberMapping): void {
    this.wordIndex = new Map(wordIndex);
  }

  /**
   * Converts the tokenizer to an object that can be
   * JSON encoded.
   *
   * @returns The JSON encodable tokenizer object.
   */
  toJSON(): StringNumberMapping {
    return Array.from(this.wordIndex.entries());
  }
}
