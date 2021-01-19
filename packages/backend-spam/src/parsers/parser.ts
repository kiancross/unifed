/*
 * CS3099 Group A3
 */

export interface Messages {
  spam: string[];
  ham: string[];
}

export abstract class Parser {
  abstract getMessages(): Promise<Messages>;
}
