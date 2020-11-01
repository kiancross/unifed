import { ApolloClient, NormalizedCacheObject, InMemoryCache } from '@apollo/client';

export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
})
