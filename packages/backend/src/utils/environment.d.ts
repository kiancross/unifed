/*
 * CS3099 Group A3
 */

interface CoverageMap {
  [key: string]: string | number | CoverageMap;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SMTP_USERNAME?: string;
      SMTP_PASSWORD?: string;
      SMTP_HOST?: string;
      SMTP_PORT?: string;
      MONGO_HOSTNAME?: string;
      MONGO_PORT?: string;
      MONGO_DATABASE?: string;
      MONGO_USERNAME?: string;
      MONGO_PASSWORD?: string;
      JWT_SECRET?: string;
      SITE_URL?: string;
      APPLICATION_NAME?: string;
      NODE_ENV?: string;
    }

    interface Global {
      __coverage__: CoverageMap;
    }
  }
}

export {};
