import { AccountsClient } from "@accounts/client";
import { AccountsClientPassword } from "@accounts/client-password";
import { AccountsGraphQLClient } from "@accounts/graphql-client";
import { apolloClient } from "./apollo-client";

// Use ApolloClient as transport mechanism
const accountsGraphQL = new AccountsGraphQLClient({
  graphQLClient: apolloClient,
});

export const accountsClient = new AccountsClient(
  {
    /*options*/
  },
  accountsGraphQL,
);

export const passwordClient = new AccountsClientPassword(accountsClient);
