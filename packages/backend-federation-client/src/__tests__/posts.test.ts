/*
 * CS3099 Group A3
 */

process.env.UNIFED_LOGGING_LEVEL = "warn";

import test from "ava";
import nock from "nock";
import { getPosts } from "../posts";


test("getPosts none", async (t) => {
  const scope = nock("http://getPostsNone").get("/fed/posts").query({ community: "foo" }).reply(200, []);

  t.deepEqual(await getPosts("getPostsNone", "foo"), []);

  scope.done();
});

/*
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
*/
