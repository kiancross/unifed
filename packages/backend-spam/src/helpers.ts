/*
 * CS3099 Group A3
 */

export function getLengthFrequencies(sentences: string[]): { [key: number]: number } {
  return sentences
    .map((sentence) => sentence.length)
    .reduce((ret, n) => {
      ret[n] = (ret[n] || 0) + 1;
      return ret;
    }, {} as { [key: number]: number });
}

export function arrayToCsv<T, R extends Array<T>>(values: R[]): string {
  return values.map((value) => value.join(",")).join("\n");
}
