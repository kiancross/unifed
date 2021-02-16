/*
 * CS3099 Group A3
 */

import { Response } from "express";
import { logger } from "@unifed/backend-core";

export const sendError = (res: Response, code: number, title?: string, message?: string): void => {
  title = title || "Unknown error";
  message = message || title;

  logger.info(`HTTP Error ${code}: ${title} --- ${message}`);

  res.status(code).json({ title, message });
};
