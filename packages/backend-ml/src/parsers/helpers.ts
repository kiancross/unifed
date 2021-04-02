/*
 * CS3099 Group A3
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
   * Data from file insize the ZIP archive.
   */
  readonly data: string;
}

/**
 * Iteratres through all entries in a given
 * ZIP archive.
 *
 * @param path  Path to the ZIP archive.
 *
 * @returns An asynconous generator yielding [[`ZIPFileEntry`]]
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
