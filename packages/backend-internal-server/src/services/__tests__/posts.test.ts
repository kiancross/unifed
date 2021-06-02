/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Allan Mathew Chacko
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
import {
  PostModel,
  CommunityModel,
  UserModel,
  RemoteReference,
  config,
} from "@unifed/backend-core";
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

  const community = generateCommunity();
  community._id = "foo";

  const admin: RemoteReference = new RemoteReference();
  admin._id = "testuser";
  admin.host = "testhost";
  community.admins = [admin];

  await CommunityModel.create(community);
  await PostModel.create(post);

  // not sure why but test fails without this line of code below :/
  await CommunityModel.findOne({ _id: "foo" as string }).exec();

  t.true(await postsService.isAdmin("testuser", post));
});

test.serial("User is not admin of community of post", async (t) => {
  const post = generatePost("foo");

  const community = generateCommunity();
  community._id = "foo";

  await CommunityModel.create(community);
  await PostModel.create(post);

  // added this here for consistency
  await CommunityModel.findOne({ _id: "foo" as string }).exec();

  t.false(await postsService.isAdmin("testuser", post));
});

test.serial("Delete post by admin of community", async (t) => {
  const post = generatePost("foo");
  post._id = "postid";

  const community = generateCommunity();
  community._id = "foo";

  const admin: RemoteReference = new RemoteReference();
  admin._id = "testuser";
  admin.host = config.siteHost;

  community.admins = [admin];
  post.author = admin;

  await CommunityModel.create(community);
  await PostModel.create(post);

  // need this again...
  await PostModel.findOne({ _id: post._id }).exec();

  t.true(await postsService.adminDelete(admin._id, post._id));
});

test.serial("Deleting post removes post reference from user", async (t) => {
  const postReference: RemoteReference = new RemoteReference();
  postReference.host = "thishost";
  postReference.id = "testid";

  const user = generateUser();
  user.username = "testuser";
  user.posts = [postReference];

  const scope = nock("http://thishost").delete("/fed/posts/testid").reply(200);

  await UserModel.create(user);

  // need this
  await UserModel.findOne({ username: "testuser" });

  let length = await UserModel.findOne({ username: "testuser" })
    .exec()
    .then((res) => res?.posts.length);
  t.is(length, 1);

  await postsService.delete("testuser", "thishost", "testid");

  length = await UserModel.findOne({ username: "testuser" })
    .exec()
    .then((res) => res?.posts.length);
  t.is(length, 0);

  scope.done();
});
