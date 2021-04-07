/*
 * CS3099 Group A3
 */

import { Message } from "./helpers";

/**
 * Error thrown if an invalid file is given
 * to the parser.
 *
 * @internal
 */
export class InvalidFileError extends Error {}

/**
 * Base class for all message parsers.
 *
 * Message parsers are used to provide a standard
 * interface to message datasets, which are stored
 * in varying formats.
 *
 * @internal
 */
export abstract class Parser {
  /**
   * Returns all parsed messages.
   */
  abstract getMessages(): Promise<Message[]>;
}
