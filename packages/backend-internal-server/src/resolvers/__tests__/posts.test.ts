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
import { graphql } from "graphql";
import { setup, generatePost, generateCommunity } from "@unifed/backend-testing";

import { getMergedSchema } from "../../schema";
import { config, PostModel, RemoteReference } from "@unifed/backend-core";
import { translateHost } from "../helpers";

setup(test);

test.serial("Create post valid", async (t) => {
  const post = generatePost("all");
  post.author.host = "createPostValid";

  const scope = nock("http://createPostValid").post("/fed/posts").reply(200, post.toJSON());

  const response = await graphql(
    await getMergedSchema(Container.of()),
    `
      mutation($title: String!, $body: String!) {
        createPost(
          post: { community: { host: "createPostValid", id: "all" }, title: $title, body: $body }
        ) {
          id
          title
          body
          author {
            id
            host
          }
        }
      }
    `,
    null,
    {
      user: {
        id: post.author.id,
      },
    },
    {
      title: post.title,
      body: post.body,
    },
  );

  if (!response.data) {
    t.fail();
    return;
  }

  t.is(response.data.createPost.title, post.title);
  t.is(response.data.createPost.body, post.body);
  t.is(response.data.createPost.author.id, post.author.id);
  t.is(response.data.createPost.author.host, "createPostValid");

  scope.done();
});

test.serial("Approve post", async (t) => {
  const response = await graphql(
    await getMergedSchema(Container.of()),
    `
      mutation {
        approvePosts(posts: [{ host: "this", id: "bar" }])
      }
    `,
    null,
    {
      user: {
        id: "user",
      },
    },
  );

  if (!response.data) {
    t.fail();
    return;
  }

  t.true(response.data.approvePosts);
});

test.serial("Delete posts", async (t) => {
  const response = await graphql(
    await getMergedSchema(Container.of()),
    `
      mutation {
        deletePosts(posts: [{ host: "this", id: "bar" }])
      }
    `,
    null,
    {
      user: {
        id: "user",
      },
    },
  );

  if (!response.data) {
    t.fail();
    return;
  }

  t.true(response.data.deletePosts);
});

test.serial("Report post from local server", async (t) => {
  const post = generatePost("foo");
  post._id = "postid";
  post.approved = true;

  PostModel.create(post);

  // first findOne call returns null
  await PostModel.findOne({ _id: "postid" }).exec();
  t.is(
    await PostModel.findOne({ _id: "postid" })
      .exec()
      .then((res) => res?.approved),
    true,
  );

  const response = await graphql(
    await getMergedSchema(Container.of()),
    `
      mutation {
        reportPost(post: { host: "this", id: "postid" })
      }
    `,
    null,
    {
      user: {
        id: "testuser",
      },
    },
  );

  if (!response.data) {
    t.fail();
    return;
  }

  t.true(response.data.reportPost);
  t.is(
    await PostModel.findOne({ _id: "postid" })
      .exec()
      .then((res) => res?.approved),
    false,
  );
});

test.serial("Get unapproved posts", async (t) => {
  const community = generateCommunity();
  community._id = "testcom";

  const host = await translateHost(config.internalReference);

  const admin: RemoteReference = new RemoteReference();
  admin._id = "testuser";
  admin.host = host;

  community.admins = [admin];

  const unapprovedPost = generatePost("testcom");
  unapprovedPost._id = "postid";
  unapprovedPost.approved = false;

  PostModel.create(unapprovedPost);

  const scope = nock("http://" + host)
    .get("/fed/communities")
    .reply(200, ["testcom"])
    .get("/fed/communities/testcom")
    .reply(200, community);

  const response = await graphql(
    await getMergedSchema(Container.of()),
    `
      query {
        getUnapprovedPosts {
          id
          title
          body
        }
      }
    `,
    null,
    {
      user: {
        id: "testuserid",
        username: "testuser",
      },
    },
  );

  if (!response.data) {
    t.fail();
    return;
  }

  t.is(response.data.getUnapprovedPosts.length, 1);
  t.is(response.data.getUnapprovedPosts[0].id, "postid");

  scope.done();
});
