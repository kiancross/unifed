/*
 * CS3099 Group A3
 */

import winston from "winston";
import { config } from "./config";

export const logger = winston.createLogger({
  level: config.loggingLevel,
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});
