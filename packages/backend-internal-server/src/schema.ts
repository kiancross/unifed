/*
 * CS3099 Group A3
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
