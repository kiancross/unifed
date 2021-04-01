/*
 * CS3099 Group A3
 */

import test from "ava";
import { Container } from "typedi";
import { CommunityModel } from "@unifed/backend-core";
import { setup } from "@unifed/backend-testing";

import { CommunitiesService } from "../communities";

setup(test);

let communitiesService: CommunitiesService;

test.beforeEach(() => {
  communitiesService = Container.get(CommunitiesService);
});

test.serial("Create community valid", async (t) => {
  t.true(await communitiesService.create("foo", "bar", "title", "description"));

  const result = await CommunityModel.findOne({ _id: "bar" });

  if (result === null) {
    t.fail();
    return;
  }

  t.is(result.title, "title");
  t.is(result.description, "description");
  t.is(result.admins.length, 1);
  t.is(result.admins[0].id, "foo");
  t.is(result.admins[0].host, "this");
});
