/*
 * CS3099 Group A3
 */

import winston from "winston";
import { config } from "./config";

/**
 * Used for logging messages throughout the application.
 *
 * Examples:
 *
 * ```ts
 * logger.log('silly', "127.0.0.1 - there's no place like home");
 * logger.log('debug', "127.0.0.1 - there's no place like home");
 * logger.log('verbose', "127.0.0.1 - there's no place like home");
 * logger.log('info', "127.0.0.1 - there's no place like home");
 * logger.log('warn', "127.0.0.1 - there's no place like home");
 * logger.log('error', "127.0.0.1 - there's no place like home");
 * logger.info("127.0.0.1 - there's no place like home");
 * logger.warn("127.0.0.1 - there's no place like home");
 * logger.error("127.0.0.1 - there's no place like home");
 * ```
 */
export const logger = winston.createLogger({
  level: config.loggingLevel,
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});
