/*
 * CS3099 Group A3
 */

import * as path from "path";
import { GraphQLSchema } from "graphql";
import { buildTypeDefsAndResolvers, emitSchemaDefinitionFile } from "type-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { CreateUserInput } from "./resolvers/inputs";
import {
  accountsTypeDefs,
  accountsResolvers,
  accountsSchemaDirectives,
  accountsDatabase,
} from "./accounts-setup";

export const schema = (async (): Promise<GraphQLSchema> => {
  await accountsDatabase.setupIndexes();

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [__dirname + "/resolvers/*.{ts,js}"],
    orphanedTypes: [CreateUserInput],
    validate: true,
  });

  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([accountsTypeDefs, typeDefs]),
    resolvers: mergeResolvers([accountsResolvers, resolvers]),
    schemaDirectives: {
      ...accountsSchemaDirectives,
    },
  });

  const schemaOutputPath = path.resolve(__dirname, "../../../build/schema.graphql");
  await emitSchemaDefinitionFile(schemaOutputPath, schema);

  return schema;
})();
