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

import test from "ava";
import os from "os";
import fs, { promises as fsPromises } from "fs";
import { Message } from "../parsers";
import * as constants from "../constants";
import { testModel } from "../test-model";

test("testModel", async (t) => {
  const messages: Message[] = [
    {
      body: "hello this is a long message",
      spam: false,
    },
    {
      body: "world",
      spam: true,
    },
  ];

  const path = await fsPromises.mkdtemp(os.tmpdir() + "/");

  await testModel(messages, path);

  t.true(fs.existsSync(`${path}/${constants.testingResultsHamName}`));
  t.true(fs.existsSync(`${path}/${constants.testingResultsSpamName}`));

  fs.rmdirSync(path, { recursive: true });
});
