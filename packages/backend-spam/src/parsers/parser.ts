/*
 * CS3099 Group A3
 */

import { Message } from "./message";

export abstract class Parser {
  abstract getMessages(): Promise<Message[]>;
}
