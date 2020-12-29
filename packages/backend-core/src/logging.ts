/*
 * CS3099 Group A3
 */

import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});
