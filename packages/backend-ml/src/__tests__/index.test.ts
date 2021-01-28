/*
 * CS3099 Group A3
 */

import test from "ava";
import { getSpamFactor } from "../index";

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
