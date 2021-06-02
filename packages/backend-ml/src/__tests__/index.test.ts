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
import { getSpamFactor, getToxicityClassification } from "../index";

test("Spam detection", async (t) => {
  const factor = await getSpamFactor("Test sentence");

  t.true(factor >= 0);
  t.true(factor <= 1);
});

test("Test spam", async (t) => {
  const factor = await getSpamFactor(
    "Keep up to speed with all our news, videos, and recent launches. Your chance" +
      "to enter competitions and win BULK POWDERS® goodies. Share and comment with " +
      "other BULK POWDERS® fans.",
  );

  t.true(factor >= 0.7);
  t.true(factor <= 1);
});

test("Test ham", async (t) => {
  const factor = await getSpamFactor(
    "I have scheduled Group B examples classes for MT2506 on Teams. This will appear" +
      "in the left-hand column as a channel, click on group A and you will see the" +
      "scheduled meeting.  To add this to your calendar click on the three dots in" +
      'the purple bar of the meeting details and select "accept" in the top left-hand' +
      "corner.",
  );

  t.true(factor >= 0);
  t.true(factor <= 0.3);
});

test("Test toxic", async (t) => {
  t.true(await getToxicityClassification("You suck"));
});

test("Test non-toxic", async (t) => {
  t.false(await getToxicityClassification("Hello world"));
});
