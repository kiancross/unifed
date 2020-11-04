/*
 * CS3099 Group A3
 */

export default {
  roots: ["<rootDir>"],
  testMatch: ["<rootDir>/**/*.test.{js,ts}"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
