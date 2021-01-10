/*
 * CS3099 Group A3
 */

import { ApolloClient, NormalizedCacheObject, InMemoryCache, ApolloLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { accountsLink } from "@accounts/apollo-link";
import { accountsClient } from "./accounts";

let graphqlApiEndpoint = process.env.REACT_APP_INTERNAL_GRAPHQL_ENDPOINT;

if (graphqlApiEndpoint === undefined) {
  graphqlApiEndpoint = "http://localhost:8080/internal";
}

const retryLink = new RetryLink();
const authLink = accountsLink(() => accountsClient);
const httpLink = new BatchHttpLink({ uri: graphqlApiEndpoint });

export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: ApolloLink.from([retryLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
