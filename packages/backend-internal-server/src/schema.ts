/*
 * CS3099 Group A3
 */

import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { internalSchema } from "./internal-schema";
import {
  accountsTypeDefs,
  accountsResolvers,
  accountsSchemaDirectives,
  accountsDatabase,
} from "./accounts-setup";

export const schema = (async (): Promise<GraphQLSchema> => {
  await accountsDatabase.setupIndexes();

  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([accountsTypeDefs, (await internalSchema).typeDefs]),
    resolvers: mergeResolvers([accountsResolvers, (await internalSchema).resolvers]),
    schemaDirectives: {
      ...accountsSchemaDirectives,
    },
  });

  return schema;
})();
