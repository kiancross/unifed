/*
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2021 Lewis Mazzei
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
import { validatePassword } from "../password";

test("Weak", (t) => {
  const result = validatePassword("weak");

  t.false(result.valid);

  t.true(result.score < 3);

  t.not(result.warning, undefined);
  if (result.warning) {
    t.regex(result.warning, /^.*$/);
  }

  for (const suggestion of result.suggestions) {
    t.regex(suggestion, /^.*$/);
  }
});

test("Strong", (t) => {
  const result = validatePassword("ThisIsAStr0ngP@55w0rd");

  t.true(result.valid);
  t.true(result.score >= 3);
  t.is(result.warning, undefined);
  t.is(result.suggestions.length, 0);
});
