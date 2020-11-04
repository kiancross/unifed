/*
 * CS3099 Group A3
 */

class EnvVarNotDefinedError extends Error {}

if (process.env.SMTP_HOST === undefined) throw new EnvVarNotDefinedError();
if (process.env.SMTP_PORT === undefined) throw new EnvVarNotDefinedError();
if (process.env.SMTP_USERNAME === undefined) throw new EnvVarNotDefinedError();
if (process.env.SMTP_PASSWORD === undefined) throw new EnvVarNotDefinedError();
if (process.env.MONGO_HOSTNAME === undefined) throw new EnvVarNotDefinedError();
if (process.env.MONGO_PORT === undefined) throw new EnvVarNotDefinedError();
if (process.env.MONGO_DATABASE === undefined) throw new EnvVarNotDefinedError();
if (process.env.MONGO_USERNAME === undefined) throw new EnvVarNotDefinedError();
if (process.env.MONGO_PASSWORD === undefined) throw new EnvVarNotDefinedError();
if (process.env.JWT_SECRET === undefined) throw new EnvVarNotDefinedError();
if (process.env.SITE_URL === undefined) throw new EnvVarNotDefinedError();
if (process.env.APPLICATION_NAME === undefined) throw new EnvVarNotDefinedError();

export const debug = process.env.NODE_ENV === "prod" ? false : true;
export const smtpHost: string = process.env.SMTP_HOST;
export const smtpPort: number = parseInt(process.env.SMTP_PORT);
export const smtpUsername: string = process.env.SMTP_USERNAME;
export const smtpPassword: string = process.env.SMTP_PASSWORD;
export const mongoHostname: string = process.env.MONGO_HOSTNAME;
export const mongoPort: number = parseInt(process.env.MONGO_PORT);
export const mongoDatabase: string = process.env.MONGO_DATABASE;
export const mongoUsername: string = process.env.MONGO_USERNAME;
export const mongoPassword: string = process.env.MONGO_PASSWORD;
export const jwtSecret: string = process.env.JWT_SECRET;
export const siteUrl: string = process.env.SITE_URL;
export const applicationName: string = process.env.APPLICATION_NAME;
