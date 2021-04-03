/*
 * CS3099 Group A3
 */

import test from "ava";
import { Container } from "typedi";
import { UserModel } from "@unifed/backend-core";
import { setup, generateUser } from "@unifed/backend-testing";

import { UsersService } from "../users";

setup(test);

let usersService: UsersService;

test.beforeEach(() => {
  usersService = Container.get(UsersService);
});

test.serial("Add subscription", async (t) => {
  const user = generateUser();

  await UserModel.create(user);

  t.true(await usersService.subscribe(user.id, "foo", "bar"));

  const subscriptions = await usersService.getSubscriptions(user.id);

  t.is(subscriptions.length, 1);
  t.is(subscriptions[0].host, "foo");
  t.is(subscriptions[0].id, "bar");
});

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
