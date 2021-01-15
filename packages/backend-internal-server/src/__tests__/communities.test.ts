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
import test from "ava";
import { graphql } from "graphql";
import { Container } from "typedi";
import { setup, generateCommunities } from "@unifed/backend-testing";
import { schema } from "../schema";
import { CommunitiesService } from "@unifed/backend-federation-client";
import { Community } from "@unifed/backend-core";

setup(test);

class CommunitiesServiceStub {
  constructor(private communities: { [host: string]: Community[] }) {}

  async getAll(host: string) {
    return this.communities[host];
  }
}

test("t", async (t) => {
  const communities = generateCommunities(5);

  Container.set(
    CommunitiesService,
    new CommunitiesServiceStub({
      localhost: communities,
    }),
  );

  const r = await graphql(
    await schema,
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

  t.pass();
});
