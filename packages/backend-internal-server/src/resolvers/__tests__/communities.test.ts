/*
 * Copyright (C) 2021 Kian Cross
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

import "reflect-metadata";
import rawTest, { TestInterface } from "ava";
import { graphql, GraphQLSchema } from "graphql";
import { Container } from "typedi";

import { setup } from "@unifed/backend-testing";
import { Community } from "@unifed/backend-core";

import { getMergedSchema } from "../../schema";
import { CommunitiesService } from "../../services";

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

  if (response.data) {
    t.deepEqual(response.data.getCommunities, []);
  } else {
    t.fail();
  }
});
