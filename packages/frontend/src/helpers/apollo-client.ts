/*
 * CS3099 Group A3
 */

import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { accountsLink } from "@accounts/apollo-link";
import { accountsClient } from "./accounts";

let graphqlApiEndpoint = process.env.REACT_APP_INTERNAL_GRAPHQL_ENDPOINT;

if (graphqlApiEndpoint === undefined) {
  graphqlApiEndpoint = "http://localhost:8080/internal";
}

const authLink = accountsLink(() => accountsClient);
const httpLink = new HttpLink({ uri: graphqlApiEndpoint });

export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
