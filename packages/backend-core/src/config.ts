/*
 * CS3099 Group A3
 */

class EnvVarNotDefinedError extends Error {}
class EnvVarNotInteger extends Error {}

function getInteger(value: string): number {
  const n = Number(value);

  if (isNaN(n) || !Number.isInteger(n)) {
    throw new EnvVarNotInteger();
  }

  return n;
}

function throwIfUndefined(value?: string): string {
  if (value === undefined) throw new EnvVarNotDefinedError();
  return value;
}

class Config {
  static get debug(): boolean {
    return process.env.NODE_ENV === "production" ? false : true;
  }

  static get smtpHost(): string {
    return throwIfUndefined(process.env.UNIFED_SMTP_HOST);
  }

  static get smtpPort(): number {
    return getInteger(throwIfUndefined(process.env.UNIFED_SMTP_PORT));
  }

  static get smtpUsername(): string {
    return throwIfUndefined(process.env.UNIFED_SMTP_USERNAME);
  }

  static get smtpPassword(): string {
    return throwIfUndefined(process.env.UNIFED_SMTP_PASSWORD);
  }

  static get mongoHostname(): string {
    return throwIfUndefined(process.env.UNIFED_MONGO_HOSTNAME);
  }

  static get mongoPort(): number {
    return getInteger(throwIfUndefined(process.env.UNIFED_MONGO_PORT));
  }

  static get mongoDatabase(): string {
    return throwIfUndefined(process.env.UNIFED_MONGO_DATABASE);
  }

  static get mongoUsername(): string {
    return throwIfUndefined(process.env.UNIFED_MONGO_USERNAME);
  }

  static get mongoPassword(): string {
    return throwIfUndefined(process.env.UNIFED_MONGO_PASSWORD);
  }

  static get jwtSecret(): string {
    return throwIfUndefined(process.env.UNIFED_JWT_SECRET);
  }

  static get siteHost(): string {
    return throwIfUndefined(process.env.UNIFED_SITE_HOST);
  }

  static get siteProtocol(): string {
    return throwIfUndefined(process.env.UNIFED_SITE_PROTOCOL);
  }

  static get siteUrl(): string {
    return `${this.siteProtocol}://${this.siteHost}`;
  }

  static get serverPort(): number {
    return getInteger(throwIfUndefined(process.env.UNIFED_SERVER_PORT));
  }

  static get applicationName(): string {
    return throwIfUndefined(process.env.UNIFED_APPLICATION_NAME);
  }

  static get loggingLevel(): string {
    return process.env.UNIFED_LOGGING_LEVEL === undefined
      ? "info"
      : process.env.UNIFED_LOGGING_LEVEL;
  }

  static get federationHost(): string {
    return throwIfUndefined(process.env.UNIFED_FEDERATION_HOST);
  }
}

export { Config as config };
