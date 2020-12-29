/*
 * CS3099 Group A3
 */

import * as path from "path";
import { GraphQLSchema } from "graphql";
import { buildTypeDefsAndResolvers, emitSchemaDefinitionFile } from "type-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import {
  accountsTypeDefs,
  accountsResolvers,
  accountsSchemaDirectives,
  accountsDatabase,
} from "./accounts-setup";
import { UsersResolver, PostsResolver, CommunitiesResolver, CreateUserInput } from "./resolvers";
import { User } from "unifed-backend-core";

export const schema = (async (): Promise<GraphQLSchema> => {
  await accountsDatabase.setupIndexes();

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [UsersResolver, PostsResolver, CommunitiesResolver],
    orphanedTypes: [CreateUserInput, User],
    validate: true,
  });

  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([accountsTypeDefs, typeDefs]),
    resolvers: mergeResolvers([accountsResolvers, resolvers]),
    schemaDirectives: {
      ...accountsSchemaDirectives,
    },
  });

  const schemaOutputPath = path.resolve(__dirname, "../../build/schema.graphql");
  await emitSchemaDefinitionFile(schemaOutputPath, schema);

  return schema;
})();
