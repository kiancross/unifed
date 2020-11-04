/*
 * CS3099 Group A3
 */

export default {
  preset: "jest-puppeteer",
  testRegex: "./*\\.test\\.ts$",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
}
