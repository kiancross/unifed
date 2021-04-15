/*

 * CS3099 Group A3
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

  let response = await graphql(
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
