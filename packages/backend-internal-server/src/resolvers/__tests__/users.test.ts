/*

 * CS3099 Group A3
 */

import test from "ava";
import { graphql } from "graphql";
import { Container } from "typedi";

import { setup, generateUser } from "@unifed/backend-testing";
import { UserModel } from "@unifed/backend-core";

import { getMergedSchema } from "../../schema";

setup(test);

test.serial("getSubscriptions empty", async (t) => {
  const response = await graphql(
    await getMergedSchema(Container.of()),
    `
      query {
        getSubscriptions {
          id
        }
      }
    `,
    null,
    {
      user: {
        id: "foo",
      },
    },
  );

  if (!response.data) {
    t.fail();
    return;
  }

  t.deepEqual(response.data.getSubscriptions, []);
});

test.serial("Add subscription", async (t) => {
  const user = generateUser();
  await UserModel.create(user);

  let response = await graphql(
    await getMergedSchema(Container.of()),
    `
      mutation {
        subscribe(community: { host: "this", id: "all" })
      }
    `,
    null,
    {
      user: {
        id: user.id,
      },
    },
  );

  if (!response.data) {
    t.fail();
    return;
  }

  t.true(response.data.subscribe);

  response = await graphql(
    await getMergedSchema(Container.of()),
    `
      query {
        getSubscriptions {
          id
        }
      }
    `,
    null,
    {
      user: {
        id: user.id,
      },
    },
  );

  console.log(response);

  if (!response.data) {
    t.fail();
    return;
  }

  t.is(response.data.getSubscriptions.length, 1);

  const subscription = response.data.getSubscriptions[0];

  t.is(subscription.host, "this");
  t.is(subscription.id, "all");
});

/*
test.serial("Add duplicate subscription", async (t) => {
  const user = generateUser();

  await UserModel.create(user);

  t.true(await usersService.subscribe(user.id, "foo", "bar"));
  t.true(await usersService.subscribe(user.id, "foo", "bar"));

  const subscriptions = await usersService.getSubscriptions(user.id);

  t.is(subscriptions.length, 1);
  t.is(subscriptions[0].host, "foo");
  t.is(subscriptions[0].id, "bar");
});

test.serial("Unsubscribe", async (t) => {
  const user = generateUser();

  await UserModel.create(user);

  t.true(await usersService.subscribe(user.id, "foo", "bar"));
  t.true(await usersService.unsubscribe(user.id, "foo", "bar"));

  const subscriptions = await usersService.getSubscriptions(user.id);

  t.is(subscriptions.length, 0);
});

test.serial("Unsubscribe duplicate", async (t) => {
  const user = generateUser();

  await UserModel.create(user);

  t.true(await usersService.subscribe(user.id, "foo", "bar"));
  t.true(await usersService.unsubscribe(user.id, "foo", "bar"));
  t.true(await usersService.unsubscribe(user.id, "foo", "bar"));

  const subscriptions = await usersService.getSubscriptions(user.id);

  t.is(subscriptions.length, 0);
});
*/
