/*
 * CS3099 Group A3
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      UNIFED_SMTP_USERNAME?: string;
      UNIFED_SMTP_PASSWORD?: string;
      UNIFED_SMTP_HOST?: string;
      UNIFED_SMTP_PORT?: string;
      UNIFED_MONGO_HOSTNAME?: string;
      UNIFED_MONGO_PORT?: string;
      UNIFED_MONGO_DATABASE?: string;
      UNIFED_MONGO_USERNAME?: string;
      UNIFED_MONGO_PASSWORD?: string;
      UNIFED_JWT_SECRET?: string;
      UNIFED_INTERNEL_REFERENCE?: string;
      UNIFED_SITE_HOST?: string;
      UNIFED_SITE_PROTOCOL?: string;
      UNIFED_APPLICATION_NAME?: string;
      UNIFED_SERVER_PORT?: string;
      UNIFED_LOG_LEVEL?: string;
      NODE_ENV?: string;
    }
  }
}

export {};
