/*
 * CS3099 Group A3
 */

import { createTransport, Transporter } from "nodemailer";
import { config } from "@unifed/backend-core";

export const getEmailTransporter = (): Transporter =>
  createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    connectionTimeout: 1000 * 10,
    auth: {
      user: config.smtpUsername,
      pass: config.smtpPassword,
    },
  });
