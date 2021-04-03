/*
 * CS3099 Group A3
 */

import "reflect-metadata";
import rawTest, { TestInterface } from "ava";
import { graphql, GraphQLSchema } from "graphql";
import { Container } from "typedi";

import { setup } from "@unifed/backend-testing";
import { RemoteReference } from "@unifed/backend-core";

import { getMergedSchema } from "../../schema";
import { UsersService } from "../../services";

class UsersServiceStub {
  subscriptions: { [host: string]: RemoteReference[] } = {};

  async getSubscriptions(id: string) {
    return this.subscriptions[id];
  }
}

interface Context {
  schema: GraphQLSchema;
  usersService: UsersServiceStub;
}

const test = rawTest as TestInterface<Context>;

setup(test);

test.beforeEach(async (t) => {
  const container = Container.of(t.title);
  const usersService = new UsersServiceStub();

  container.set(UsersService, usersService);

  t.context.schema = await getMergedSchema(container);
  t.context.usersService = usersService;
});

test("getSubscriptions empty", async (t) => {
  t.context.usersService.subscriptions["foo"] = [];

  const response = await graphql(
    t.context.schema,
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

test("getSubscriptions single", async (t) => {
  const remoteReference = new RemoteReference();
  remoteReference.id = "bar";
  remoteReference.host = "baz";

  t.context.usersService.subscriptions["foo"] = [remoteReference];

  const response = await graphql(
    t.context.schema,
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

  t.is(response.data.getSubscriptions.length, 1);
});
