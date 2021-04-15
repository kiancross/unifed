/*
 * CS3099 Group A3
 */

/**
 * Thrown in case an error should be returned
 * to the client.
 *
 * @internal
 */
export class ResponseError extends Error {
  /**
   * The error code.
   */
  readonly code: number;

  /**
   * The title of the error.
   */
  readonly title: string;

  /**
   * The error message.
   */
  readonly message: string;

  /**
   * @param code  The error code.
   * @param title  The title of the error.
   * @param message The error message.
   */
  constructor(code: number, title?: string, message?: string) {
    title = title || "Unknown error";
    message = message || title;

    super(`${code}: ${title} --- ${message}`);

    this.code = code;
    this.title = title;
    this.message = message;
  }
}
