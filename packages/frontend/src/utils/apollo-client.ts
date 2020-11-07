import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { accountsLink } from "@accounts/apollo-link";
import { accountsClient } from "./accounts";

const authLink = accountsLink(() => accountsClient);
const httpLink = new HttpLink({ uri: "http://localhost:8080/internal" });

export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
