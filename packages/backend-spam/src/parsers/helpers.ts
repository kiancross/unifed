/*
 * CS3099 Group A3
 */

import StreamZip from "node-stream-zip";

export interface Message {
  readonly body: string;
  readonly spam: boolean;
}

export interface ZipFileEntry {
  readonly path: string;
  readonly data: string;
}

export async function* readZipFile(path: string): AsyncGenerator<ZipFileEntry> {
  const zip: StreamZip = await new Promise((resolve, reject) => {
    const zip = new StreamZip({
      file: path,
      storeEntries: true,
    });

    zip.on("error", (error) => reject(error));
    zip.on("ready", () => resolve(zip));
  });

  for (const entry of Object.values(zip.entries())) {
    if (entry.isDirectory) {
      continue;
    }

    yield {
      path: entry.name,
      data: zip.entryDataSync(entry.name).toString("utf8"),
    };
  }
}

export function mergeMessageSets(messageSets: Message[][]): Message[] {
  const messages: Message[] = [];

  for (const set of messageSets) {
    messages.push(...set);
  }

  return messages;
}
