/*
 * CS3099 Group A3
 */

import { createTransport } from "nodemailer";
import * as config from "./config";

export const emailTransporter = createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  connectionTimeout: 1000 * 10,
  auth: {
    user: config.smtpUsername,
    pass: config.smtpPassword,
  },
});
