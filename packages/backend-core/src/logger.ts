/*
 * Copyright (C) 2020 Kian Cross
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
