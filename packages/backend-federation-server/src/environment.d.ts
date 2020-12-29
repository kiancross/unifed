/*
 * CS3099 Group A3
 */

interface CoverageMap {
  [key: string]: string | number | CoverageMap;
}

declare global {
  namespace NodeJS {
    interface Global {
      __coverage__: CoverageMap;
    }
  }
}

export {};
