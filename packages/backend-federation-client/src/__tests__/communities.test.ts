/*
 * Copyright (C) 2020 Kian Cross
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
import nock from "nock";
import { Container } from "typedi";
import { CommunitiesFederationService, CommunityNotFoundError } from "../communities";
import { RemoteResponseError, HTTPError } from "../helpers";
import { RemoteReference } from "@unifed/backend-core";

let communitiesService: CommunitiesFederationService;

test.beforeEach(() => {
  communitiesService = Container.get(CommunitiesFederationService);
});

test("getCommunities none", async (t) => {
  const scope = nock("http://getCommunitiesNone").get("/fed/communities").reply(200, []);

  t.deepEqual(await communitiesService.getAll("getCommunitiesNone"), []);

  scope.done();
});

test("getCommunities missing", async (t) => {
  const scope = nock("http://getCommunitiesMissing")
    .get("/fed/communities")
    .reply(200, ["foo"])
    .get("/fed/communities/foo")
    .reply(404);

  await t.throwsAsync(async () => await communitiesService.getAll("getCommunitiesMissing"), {
    instanceOf: CommunityNotFoundError,
  });

  scope.done();
});

test("getCommunities not array", async (t) => {
  const scope = nock("http://getCommunitiesNotArray")
    .get("/fed/communities")
    .reply(200, JSON.stringify("foo"));

  await t.throwsAsync(async () => await communitiesService.getAll("getCommunitiesNotArray"), {
    instanceOf: RemoteResponseError,
  });

  scope.done();
});

test("getCommunities not string array", async (t) => {
  const scope = nock("http://getCommunitiesNotStringArray")
    .get("/fed/communities")
    .reply(200, [true]);

  await t.throwsAsync(async () => await communitiesService.getAll("getCommunitiesNotStringArray"), {
    instanceOf: RemoteResponseError,
  });

  scope.done();
});

test("getCommunities valid", async (t) => {
  const admin = new RemoteReference();
  admin.id = "coolusername123";
  admin.host = "cooldomain.edu";

  const community = {
    id: "cs3099",
    title: "CS3099: Group Project",
    description: "CS3099 community for discussion, tutorials and quizzes!",
    admins: [admin],
  };

  const scope = nock("http://getCommunitiesValid")
    .get("/fed/communities")
    .reply(200, ["foo"])
    .get("/fed/communities/foo")
    .reply(200, community);

  t.plan(1);

  const receivedCommunities = await communitiesService.getAll("getCommunitiesValid");

  for (const receivedCommunity of receivedCommunities) {
    t.like(receivedCommunity, community);
  }

  scope.done();
});

test("getCommunity missing", async (t) => {
  const scope = nock("http://getCommunityMissing").get("/fed/communities/foo").reply(404);

  t.is(await communitiesService.getOne("getCommunityMissing", "foo"), null);

  scope.done();
});

test("getCommunity serverError", async (t) => {
  const scope = nock("http://getCommunityServerError").get("/fed/communities/foo").reply(403);

  await t.throwsAsync(
    async () => await communitiesService.getOne("getCommunityServerError", "foo"),
    {
      instanceOf: HTTPError,
    },
  );

  scope.done();
});

test("getCommunity valid", async (t) => {
  const admin = new RemoteReference();
  admin.id = "coolusername123";
  admin.host = "cooldomain.edu";

  const community = {
    id: "cs3099",
    title: "CS3099: Group Project",
    description: "CS3099 community for discussion, tutorials and quizzes!",
    admins: [admin],
  };

  const scope = nock("http://getCommunityValid").get("/fed/communities/foo").reply(200, community);

  t.like(await communitiesService.getOne("getCommunityValid", "foo"), community);

  scope.done();
});

test("getCommunity invalid", async (t) => {
  const community = {
    id: "cs3099",
    description: "CS3099 community for discussion, tutorials and quizzes!",
    admins: [],
  };

  const scope = nock("http://getCommunityInvalid")
    .get("/fed/communities/foo")
    .reply(200, community);

  await t.throwsAsync(async () => await communitiesService.getOne("getCommunityInvalid", "foo"), {
    instanceOf: RemoteResponseError,
  });

  scope.done();
});
