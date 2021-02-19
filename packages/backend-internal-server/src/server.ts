/*
 * CS3099 Group A3
 */

import { ApolloServer } from "apollo-server-express";
import { Container } from "typedi";
import { config } from "@unifed/backend-core";
import { accountsContext } from "./accounts-setup";
import { getMergedSchema } from "./schema";

export const server = (async (): Promise<ApolloServer> => {
  return new ApolloServer({
    schema: await getMergedSchema(Container.of()),
    subscriptions: {
      path: "/",
    },
    playground: config.debug
      ? {
          subscriptionEndpoint: `ws://${config.siteHost}/internal`,
        }
      : false,
    context: accountsContext,
  });
})();
