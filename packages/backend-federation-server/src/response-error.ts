/*
 * Copyright (C) 2021 Kian Cross
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
