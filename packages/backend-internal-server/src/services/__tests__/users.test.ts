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
