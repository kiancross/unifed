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

import StreamZip from "node-stream-zip";

/**
 * A spam/non-spam message.
 *
 * @internal
 */
export interface Message {
  /**
   * The body of the message.
   */
  readonly body: string;

  /**
   * Flag indicating if the message has been
   * categorised as spam or non-spam.
   */
  readonly spam: boolean;
}

/**
 * A file from inside a ZIP archive.
 *
 * @internal
 */
export interface ZIPFileEntry {
  /**
   * Path of file inside the ZIP archive.
   */
  readonly path: string;

  /**
   * Data from file inside the ZIP archive.
   */
  readonly data: string;
}

/**
 * Iterates through all entries in a given
 * ZIP archive.
 *
 * @param path  Path to the ZIP archive.
 *
 * @returns An asynchronous generator yielding [[`ZIPFileEntry`]]
 *          objects.
 *
 * @internal
 */
export async function* readZIPFile(path: string): AsyncGenerator<ZIPFileEntry, void> {
  const zip: StreamZip = await new Promise((resolve, reject) => {
    const zip = new StreamZip({
      file: path,
      storeEntries: true,
    });

    zip.on("error", (error) => reject(error));
    zip.on("ready", () => resolve(zip));
  });

  for (const entry of Object.values(zip.entries())) {
    // We're only interested in files.
    if (entry.isDirectory) {
      continue;
    }

    yield {
      path: entry.name,
      data: zip.entryDataSync(entry.name).toString("utf8"),
    };
  }
}
