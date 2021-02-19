/*
 * CS3099 Group A3
 */

export class ResponseError extends Error {
  readonly code: number;
  readonly title: string;
  readonly message: string;

  constructor(code: number, title?: string, message?: string) {
    title = title || "Unknown error";
    message = message || title;

    super(`${code}: ${title} --- ${message}`);

    this.code = code;
    this.title = title;
    this.message = message;
  }
}
