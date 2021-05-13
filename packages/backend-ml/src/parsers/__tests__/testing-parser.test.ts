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
import { InvalidFileError } from "../parser";
import { TestingParser } from "../testing-parser";

test("Parse valid", async (t) => {
  const parser = new TestingParser(`${__dirname}/../../../test-data/testing-valid.zip`);
  const messages = await parser.getMessages();

  t.deepEqual(messages, [
    { body: "bar", spam: true },
    { body: "baz", spam: false },
  ]);
});

test("Parse invalid file", async (t) => {
  const parser = new TestingParser(`${__dirname}/../../../test-data/testing-invalid-file.zip`);

  await t.throwsAsync(async () => await parser.getMessages(), {
    instanceOf: InvalidFileError,
  });
});

test("Parse invalid type", async (t) => {
  const parser = new TestingParser(`${__dirname}/../../../test-data/testing-invalid-type.zip`);

  await t.throwsAsync(async () => await parser.getMessages(), {
    instanceOf: InvalidFileError,
  });
});
