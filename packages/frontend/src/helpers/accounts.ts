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

/**
 * Client for dealing with logging in and out of the application.
 * 
 * @internal
 */
export const accountsClient = new AccountsClient({}, accountsGraphQL);

/**
 * Client for dealing with password information of users.
 * 
 * @internal
 */
export const passwordClient = new AccountsClientPassword(accountsClient);

setAccountsClient(accountsClient);
