/*
 * CS3099 Group A3
 */

export default {
  roots: ["<rootDir>/src"],
  testMatch: ["<rootDir>/src/**/__tests__/**/*.{js,ts}", "<rootDir>/src/**/*.test.{js,ts}"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
