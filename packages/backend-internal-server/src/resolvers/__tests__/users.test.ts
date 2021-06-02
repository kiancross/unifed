/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
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
import { graphql } from "graphql";
import { Container } from "typedi";

import { setup, generateUser, generatePost } from "@unifed/backend-testing";
import { RemoteReference, UserModel } from "@unifed/backend-core";

import { getMergedSchema } from "../../schema";
import nock from "nock";

const schema = (async () => getMergedSchema(Container.of()))();

setup(test);

test.serial("getSubscriptions empty", async (t) => {
  const response = await graphql(
    await schema,
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

test.serial("subscribe", async (t) => {
  const user = generateUser();
  await UserModel.create(user);

  let response = await graphql(
    await schema,
    `
      mutation {
        subscribe(community: { host: "foo", id: "all" })
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
    await schema,
    `
      query {
        getSubscriptions {
          id
          host
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

  if (!response.data) {
    t.fail();
    return;
  }

  t.is(response.data.getSubscriptions.length, 1);

  const subscription = response.data.getSubscriptions[0];

  t.is(subscription.host, "foo");
  t.is(subscription.id, "all");
});

test.serial("unsubscribe", async (t) => {
  const user = generateUser();
  await UserModel.create(user);

  let response = await graphql(
    await schema,
    `
      mutation {
        subscribe(community: { host: "foo", id: "all" })
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
    await schema,
    `
      mutation {
        unsubscribe(community: { host: "foo", id: "all" })
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

  t.true(response.data.unsubscribe);

  response = await graphql(
    await schema,
    `
      query {
        getSubscriptions {
          id
          host
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

  if (!response.data) {
    t.fail();
    return;
  }

  t.is(response.data.getSubscriptions.length, 0);
});

test.serial("getAllPosts", async (t) => {
  const postReference: RemoteReference = new RemoteReference();
  postReference.host = "thishost";
  postReference.id = "testid";

  const post = generatePost("all");
  post.id = "testid";
  post.host = "thishost";

  const scope = nock("http://thishost").get("/fed/posts/testid").reply(200, post);

  const user = generateUser();
  user.username = "testuser";
  user.posts = [postReference];
  await UserModel.create(user);

  await UserModel.findOne({ username: "testuser" });

  const response = await graphql(
    await schema,
    `
      query {
        getAllPosts(username: "testuser") {
          title
          body
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

  if (!response.data) {
    t.fail();
    return;
  }

  t.truthy(response.data.getAllPosts);

  scope.done();
});
