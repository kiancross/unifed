/*
 * CS3099 Group A3
 */

import test from "ava";
import { validate } from "class-validator";
import { PublicUser, UserProfile } from "../public-user";

test("Invalid username", async (t) => {
  const user = new PublicUser();
  user.profile = new UserProfile();
  user.profile.name = "foo";

  const result = await validate(user);

  t.is(result.length, 1);
});

test("Invalid profile", async (t) => {
  const user = new PublicUser();
  user.username = "foo";

  const result = await validate(user);

  t.is(result.length, 1);
});

test("toJSON", (t) => {
  const user = new PublicUser();
  user.username = "foo";

  user.profile = new UserProfile();
  user.profile.name = "bar";

  t.deepEqual(user.toJSON(), {
    username: "foo",
    profile: {
      name: "bar",
    },
  });
});
