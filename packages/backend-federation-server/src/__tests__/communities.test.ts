/*
 * CS3099 Group A3
 */

import os from "os";
import test from "ava";
import { MongoMemoryServer } from "mongodb-memory-server-core";
import mongoose from "mongoose";

const mongod = new MongoMemoryServer({
  binary: {
    downloadDir: `${os.homedir()}/.cache/mongodb-binaries`
  }
});

test.before(async () => {
	const uri = await mongod.getUri();
	await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

test.serial('litmus get user', async t => {
  t.pass()
});

test.after.always(async () => {
	mongoose.disconnect()
	mongod.stop()
})
