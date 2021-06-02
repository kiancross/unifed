/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
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

/**
 * Sets up and tears down the database before and after each test.
 *
 * @param test the test to be run after the database is set up.
 */
export const setup = (test: TestType): void => {
  test.before(async () => {
    const uri = await mongod.getUri();

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  test.beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  test.after.always(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });
};
