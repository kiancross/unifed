/*
 * CS3099 Group A3
 */

import test from "ava";
import os from "os";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-core";
import { lorem, random } from "faker";
import { Community } from "@unifed/backend-core";

type TestType = typeof test;

const mongod = new MongoMemoryServer({
  binary: {
    downloadDir: `${os.homedir()}/.cache/mongodb-binaries`,
  },
});

export const setup = (test: TestType): void => {
  test.before(async () => {
    const uri = await mongod.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  test.beforeEach(async () => {
    mongoose.connection.db.dropDatabase();
  });

  test.after.always(async () => {
    mongoose.disconnect();
    mongod.stop();
  });
};

export const generateCommunity = (): Community => {
  const community = new Community();
  community.id = random.word();
  community.title = lorem.words();
  community.description = lorem.sentence();

  return community;
};

export const generateCommunities = (n: number): Community[] => {
  const communities = [];

  for (let i = 0; i < n; i++) {
    communities.push(generateCommunity());
  }

  return communities;
};
