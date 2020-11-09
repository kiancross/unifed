/*
 * CS3099 Group A3
 */

import { Application, Router } from "express";
import { ApolloServer } from "apollo-server-express";
import { accountsContext } from "./accounts-setup";
import { schema } from "./schema";
import { config } from "../utils";

export const routes = (async (): Promise<Router> => {
  const router: Router = Router();

  const server = new ApolloServer({
    schema: await schema,
    playground: config.debug,
    context: accountsContext,
  });

  // Have to cast to Application, as Router is not allowed (even though)
  // it does work:
  // https://github.com/apollographql/apollo-server/blob/main/packages/
  // apollo-server-express/src/ApolloServer.ts#L33-L41
  server.applyMiddleware({ app: router as Application, path: "/" });

  return router;
})();
