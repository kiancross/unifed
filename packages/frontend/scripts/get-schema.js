/*
 * Copyright (C) 2021 Kian Cross
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
