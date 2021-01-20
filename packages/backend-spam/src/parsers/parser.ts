/*
 * CS3099 Group A3
 */

import { Message } from "./helpers";

export abstract class Parser {
  abstract getMessages(): Promise<Message[]>;
}
