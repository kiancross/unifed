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
    return throwIfUndefined(process.env.SMTP_HOST);
  }

  static get smtpPort(): number {
    return getInteger(throwIfUndefined(process.env.SMTP_PORT));
  }

  static get smtpUsername(): string {
    return throwIfUndefined(process.env.SMTP_USERNAME);
  }

  static get smtpPassword(): string {
    return throwIfUndefined(process.env.SMTP_PASSWORD);
  }

  static get mongoHostname(): string {
    return throwIfUndefined(process.env.MONGO_HOSTNAME);
  }

  static get mongoPort(): number {
    return getInteger(throwIfUndefined(process.env.MONGO_PORT));
  }

  static get mongoDatabase(): string {
    return throwIfUndefined(process.env.MONGO_DATABASE);
  }

  static get mongoUsername(): string {
    return throwIfUndefined(process.env.MONGO_USERNAME);
  }

  static get mongoPassword(): string {
    return throwIfUndefined(process.env.MONGO_PASSWORD);
  }

  static get jwtSecret(): string {
    return throwIfUndefined(process.env.JWT_SECRET);
  }

  static get siteHost(): string {
    return throwIfUndefined(process.env.SITE_HOST)
  }

  static get siteProtocol(): string {
    return throwIfUndefined(process.env.SITE_PROTOCOL)
  }
  
  static get siteUrl(): string {
    return `${this.siteProtocol}://${this.siteHost}`;
  }

  static get applicationName(): string {
    return throwIfUndefined(process.env.APPLICATION_NAME);
  }
}

export { Config as config };
