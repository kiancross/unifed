/*
 * CS3099 Group A3
 */

import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const SERVER_PORT = 8080;
const app = express();

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    return "Hello world!";
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on http://localhost:${SERVER_PORT}`);
});
