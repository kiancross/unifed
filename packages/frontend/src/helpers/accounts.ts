/*
 * CS3099 Group A3
 */

import { AccountsGraphQLClient } from "@accounts/graphql-client";
import { AccountsClient } from "@accounts/client";
import { AccountsClientPassword } from "@accounts/client-password";
import { apolloClient, setAccountsClient } from "./apollo-client";

const accountsGraphQL = new AccountsGraphQLClient({
  graphQLClient: apolloClient,
});

export const accountsClient = new AccountsClient({}, accountsGraphQL);
export const passwordClient = new AccountsClientPassword(accountsClient);

setAccountsClient(accountsClient);
