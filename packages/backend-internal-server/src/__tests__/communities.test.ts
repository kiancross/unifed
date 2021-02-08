/*
 * CS3099 Group A3
 */

process.env.UNIFED_APPLICATION_NAME = "Something";
process.env.UNIFED_SITE_PROTOCOL = "http";
process.env.UNIFED_SITE_HOST = "localhost";
process.env.UNIFED_FEDERATION_HOST = "localhost";
process.env.UNIFED_JWT_SECRET = "Something";
process.env.UNIFED_SMTP_HOST = "smtp.ethereal.email";
process.env.UNIFED_SMTP_PORT = "587";
process.env.UNIFED_SMTP_USERNAME = "rogers.price3@ethereal.email";
process.env.UNIFED_SMTP_PASSWORD = "YwgzQrmK2gemUfR63g";

import "reflect-metadata";
import rawTest, { TestInterface } from "ava";
import { graphql, GraphQLSchema } from "graphql";
import { Container } from "typedi";
import { setup } from "@unifed/backend-testing";
import { getMergedSchema } from "../schema";
import { CommunitiesService } from "../services";
import { Community } from "@unifed/backend-core";

class CommunitiesServiceStub {
  communities: { [host: string]: Community[] } = {};

  async getAll(host: string) {
    return this.communities[host] || [];
  }
}

interface Context {
  schema: GraphQLSchema;
  communitiesService: CommunitiesServiceStub;
}

const test = rawTest as TestInterface<Context>;

setup(test);

test.beforeEach(async (t) => {
  const container = Container.of(t.title);
  const communitiesService = new CommunitiesServiceStub();

  container.set(CommunitiesService, communitiesService);

  t.context.schema = await getMergedSchema(container);
  t.context.communitiesService = communitiesService;
});

test("Communities empty", async (t) => {
  const response = await graphql(
    t.context.schema,
    `
      query {
        getCommunities(host: "localhost") {
          id
          title
          description
        }
      }
    `,
  );

  t.not(response.data, null);
  response.data && t.deepEqual(response.data.getCommunities, []);
});
