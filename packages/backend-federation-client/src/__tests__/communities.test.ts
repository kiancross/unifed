/*
 * CS3099 Group A3
 */

process.env.UNIFED_LOGGING_LEVEL = "warn";

import test from "ava";
import nock from "nock";
import { getCommunities, getCommunity, CommunityNotFoundError } from "../communities";
import { RemoteResponseError, HTTPError } from "../helpers";
import { RemoteReference } from "@unifed/backend-core";

test("getCommunities none", async (t) => {
  const scope = nock("http://getCommunitiesNone").get("/fed/communities").reply(200, []);

  t.deepEqual(await getCommunities("getCommunitiesNone"), []);

  scope.done();
});

test("getCommunities missing", async (t) => {
  const scope = nock("http://getCommunitiesMissing")
    .get("/fed/communities")
    .reply(200, ["foo"])
    .get("/fed/communities/foo")
    .reply(404);

  await t.throwsAsync(async () => await getCommunities("getCommunitiesMissing"), {
    instanceOf: CommunityNotFoundError,
  });

  scope.done();
});

test("getCommunities not array", async (t) => {
  const scope = nock("http://getCommunitiesNotArray")
    .get("/fed/communities")
    .reply(200, JSON.stringify("foo"));

  await t.throwsAsync(async () => await getCommunities("getCommunitiesNotArray"), {
    instanceOf: RemoteResponseError,
  });

  scope.done();
});

test("getCommunities not string array", async (t) => {
  const scope = nock("http://getCommunitiesNotStringArray")
    .get("/fed/communities")
    .reply(200, [true]);

  await t.throwsAsync(async () => await getCommunities("getCommunitiesNotStringArray"), {
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

  const receivedCommunities = await getCommunities("getCommunitiesValid");

  for (const receivedCommunity of receivedCommunities) {
    t.like(receivedCommunity, community);
  }

  scope.done();
});

test("getCommunity missing", async (t) => {
  const scope = nock("http://getCommunityMissing").get("/fed/communities/foo").reply(404);

  t.is(await getCommunity("getCommunityMissing", "foo"), null);

  scope.done();
});

test("getCommunity serverError", async (t) => {
  const scope = nock("http://getCommunityServerError").get("/fed/communities/foo").reply(403);

  await t.throwsAsync(async () => await getCommunity("getCommunityServerError", "foo"), {
    instanceOf: HTTPError,
  });

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

  t.like(await getCommunity("getCommunityValid", "foo"), community);

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

  await t.throwsAsync(async () => await getCommunity("getCommunityInvalid", "foo"), {
    instanceOf: RemoteResponseError,
  });

  scope.done();
});
