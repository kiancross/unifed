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

/**
 * Error thrown if a required environment variable is not
 * defined.
 *
 * @internal
 */
export class EnvVarNotDefinedError extends Error {}

/**
 * Error thrown if an integer environment variable is
 * of the wrong type.
 *
 * @internal
 */
export class EnvVarNotInteger extends Error {}

/**
 * Converts a string to an integer. If the given value
 * can not be converted to an integer, a
 * [[`EnvVarNotInteger`]] error is thrown.
 *
 * @param value  A string to convert to an integer.
 *
 * @returns The converted integer.
 *
 * @internal
 */
function getInteger(value: string): number {
  const n = Number(value);

  if (isNaN(n) || !Number.isInteger(n)) {
    throw new EnvVarNotInteger();
  }

  return n;
}

/**
 * Throws a [[`EnvVarNotDefinedError`]] if the given value
 * is `undefined`.
 *
 * @param value  The value to check.
 *
 * @returns The same as the passed value.
 *
 * @internal
 */
function throwIfUndefined(value?: string): string {
  if (value === undefined) throw new EnvVarNotDefinedError();
  return value;
}

/**
 * Class providing access to configuration parameters through
 * environment variables.
 */
class Config {
  /**
   * Indicates whether the application is in debug mode.
   */
  static get debug(): boolean {
    return process.env.NODE_ENV === "production" ? false : true;
  }

  /**
   * The SMTP host used for sending emails.
   */
  static get smtpHost(): string {
    return throwIfUndefined(process.env.UNIFED_SMTP_HOST);
  }

  /**
   * The SMTP port used for sending emails.
   */
  static get smtpPort(): number {
    return getInteger(throwIfUndefined(process.env.UNIFED_SMTP_PORT));
  }

  /**
   * The SMTP username used for sending emails.
   */
  static get smtpUsername(): string {
    return throwIfUndefined(process.env.UNIFED_SMTP_USERNAME);
  }

  /**
   * The SMTP password used for sending emails.
   */
  static get smtpPassword(): string {
    return throwIfUndefined(process.env.UNIFED_SMTP_PASSWORD);
  }

  /**
   * The MongoDB hostname.
   */
  static get mongoHostname(): string {
    return throwIfUndefined(process.env.UNIFED_MONGO_HOSTNAME);
  }

  /**
   * The MongoDB port number.
   */
  static get mongoPort(): number {
    return getInteger(throwIfUndefined(process.env.UNIFED_MONGO_PORT));
  }

  /**
   * The MongoDB database name.
   */
  static get mongoDatabase(): string {
    return throwIfUndefined(process.env.UNIFED_MONGO_DATABASE);
  }

  /**
   * The MongoDB database username.
   */
  static get mongoUsername(): string {
    return throwIfUndefined(process.env.UNIFED_MONGO_USERNAME);
  }

  /**
   * The MongoDB database password.
   */
  static get mongoPassword(): string {
    return throwIfUndefined(process.env.UNIFED_MONGO_PASSWORD);
  }

  /**
   * The secret used for signing JSON Web Tokens.
   */
  static get jwtSecret(): string {
    return throwIfUndefined(process.env.UNIFED_JWT_SECRET);
  }

  /**
   * The alias used to refer to the local instance (usually
   * set to `this`).
   */
  static get internalReference(): string {
    return throwIfUndefined(process.env.UNIFED_INTERNAL_REFERENCE);
  }

  /**
   * The external hostname of the local instance.
   */
  static get siteHost(): string {
    return throwIfUndefined(process.env.UNIFED_SITE_HOST);
  }

  /**
   * The external protocol of the local instance (either `http`
   * or `https`).
   */
  static get siteProtocol(): string {
    return throwIfUndefined(process.env.UNIFED_SITE_PROTOCOL);
  }

  /**
   * A convinience method that combines the [[`config.siteProtocol`]]
   * and [[`config.siteHost`]].
   */
  static get siteUrl(): string {
    return `${this.siteProtocol}://${this.siteHost}`;
  }

  /**
   * The port number to run the server on.
   */
  static get serverPort(): number {
    return getInteger(throwIfUndefined(process.env.UNIFED_SERVER_PORT));
  }

  /**
   * The name of the application.
   *
   * Used in emails and other backend generated content.
   */
  static get applicationName(): string {
    return throwIfUndefined(process.env.UNIFED_APPLICATION_NAME);
  }

  /**
   * The logging level to be used by the application.
   */
  static get loggingLevel(): string {
    return process.env.UNIFED_LOGGING_LEVEL === undefined
      ? "info"
      : process.env.UNIFED_LOGGING_LEVEL;
  }

  /**
   * The hostname of the local federated instance.
   */
  static get federationHost(): string {
    return throwIfUndefined(process.env.UNIFED_FEDERATION_HOST);
  }
}

export { Config as config };
