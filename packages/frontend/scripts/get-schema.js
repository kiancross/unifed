/*
 * CS3099 Group A3
 */

// eslint-disable-next-line
const fetch = require("cross-fetch");
// eslint-disable-next-line
const apollo = require("@apollo/client");
// eslint-disable-next-line
const fs = require("fs");
// eslint-disable-next-line
const {
  buildClientSchema,
  getIntrospectionQuery,
  printSchema,
} = require('graphql/utilities');

if (process.env.CI === "true") {
  process.exit();
}

const client = new apollo.ApolloClient({
  link: new apollo.HttpLink({ uri: "http://localhost:8080/internal", fetch }),
  cache: new apollo.InMemoryCache(),
});

client
  .query({
    query: apollo.gql`${getIntrospectionQuery()}`
  })
  .then(schemaJSON => printSchema(buildClientSchema(schemaJSON.data)))
  .then((schema) => {
    fs.writeFileSync(__dirname + "/../.schema.graphql", schema);
  })
  .catch(() => console.warn("No GraphQL schema found"));
