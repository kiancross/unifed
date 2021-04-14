/*
 * CS3099 Group A3
 */

import test from "ava";
import nock from "nock";
import { Container } from "typedi";
import { PostModel, CommunityModel, UserModel, RemoteReference, config } from "@unifed/backend-core";
import { setup, generatePost, generateCommunity, generateUser } from "@unifed/backend-testing";

import { PostsService } from "../posts";

setup(test);

let postsService: PostsService;

test.beforeEach(() => {
  postsService = Container.get(PostsService);
});

test.serial("Get unfiltered posts from community", async (t) => {
  const post = generatePost("foo");
  await PostModel.create(post);

  const posts = await postsService.getUnfilteredPosts("foo");
  t.is(posts.length, 1);
});

test.serial("User is admin of community of post", async (t) => {
  const post = generatePost("foo");

  let community = generateCommunity();
  community._id = "foo";

  let admin: RemoteReference = new RemoteReference();
  admin._id = "testuser";
  admin.host = "testhost";
  community.admins = [admin];

  CommunityModel.create(community);
  PostModel.create(post);

  // not sure why but test fails without this line of code below :/
  await CommunityModel.findOne({ _id: "foo" as string }).exec();

  t.true(await postsService.isAdmin("testuser", post));
});

test.serial("User is not admin of community of post", async (t) => {
  const post = generatePost("foo");

  let community = generateCommunity();
  community._id = "foo";

  CommunityModel.create(community);
  PostModel.create(post);

  // added this here for consistency
  await CommunityModel.findOne({ _id: "foo" as string }).exec();

  t.false(await postsService.isAdmin("testuser", post));
});

test.serial("Delete post by admin of community", async (t) => {
  let post = generatePost("foo");
  post._id = "postid";

  let community = generateCommunity();
  community._id = "foo";

  let admin: RemoteReference = new RemoteReference();
  admin._id = "testuser";
  admin.host = config.siteHost;

  community.admins = [admin];
  post.author = admin;

  CommunityModel.create(community);
  PostModel.create(post);

  // need this again...
  await PostModel.findOne({ _id: post._id }).exec();

  t.true(await postsService.adminDelete(admin._id, post._id));
});

test.serial("Deleting post removes post reference from user", async (t) => {
  const postReference: RemoteReference = new RemoteReference();
  postReference.host = "thishost";
  postReference.id = "testid";

  let user = generateUser();
  user.username = "testuser"
  user.posts = [postReference];

  const scope = nock("http://thishost").delete("/fed/posts/testid").reply(200);

  UserModel.create(user);

  // need this
  await UserModel.findOne({ username: "testuser" });

  let length = await UserModel.findOne({ username: "testuser" }).exec().then(res => res?.posts.length);
  t.is(length, 1);
  
  await postsService.delete("testuser", "thishost", "testid");

  length = await UserModel.findOne({ username: "testuser" }).exec().then(res => res?.posts.length);
  t.is(length, 0);

  scope.done();
});
