/*
 * Copyright (C) 2020 Kian Cross
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

import { ContainerInstance } from "typedi";
import { GraphQLSchema } from "graphql";
import { User } from "@unifed/backend-core";
import { buildTypeDefsAndResolvers, ResolversMap } from "type-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { UsersResolver, PostsResolver, CommunitiesResolver, CreateUserInput } from "./resolvers";
import {
  accountsTypeDefs,
  accountsResolvers,
  accountsSchemaDirectives,
  accountsDatabase,
} from "./accounts-setup";

export const getInternalSchema = async (
  container: ContainerInstance,
): Promise<{ typeDefs: string; resolvers: ResolversMap }> =>
  await buildTypeDefsAndResolvers({
    resolvers: [UsersResolver, PostsResolver, CommunitiesResolver],
    orphanedTypes: [CreateUserInput, User],
    container: container,
    validate: true,
  });

export const getMergedSchema = async (container: ContainerInstance): Promise<GraphQLSchema> => {
  await accountsDatabase.setupIndexes();

  const { typeDefs: internalTypeDefs, resolvers: internalResolvers } = await getInternalSchema(
    container,
  );

  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([accountsTypeDefs, internalTypeDefs]),
    resolvers: mergeResolvers([accountsResolvers, internalResolvers]),
    schemaDirectives: {
      ...accountsSchemaDirectives,
    },
  });

  return schema;
};
