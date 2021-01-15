/*
 * CS3099 Group A3
 */

import test from "ava";
import os from "os";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-core";

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
