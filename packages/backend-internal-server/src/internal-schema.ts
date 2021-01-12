/*
 * CS3009 Group A3
 */

import { buildTypeDefsAndResolvers } from "type-graphql";
import { UsersResolver, PostsResolver, CommunitiesResolver, CreateUserInput } from "./resolvers";
import { User } from "@unifed/backend-core";

export const internalSchema = (async () =>
  await buildTypeDefsAndResolvers({
    resolvers: [UsersResolver, PostsResolver, CommunitiesResolver],
    orphanedTypes: [CreateUserInput, User],
    validate: true,
  }))();
