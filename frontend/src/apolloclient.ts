import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache
} from '@apollo/client'

export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'http://localhost:8080/internal',
  cache: new InMemoryCache()
})
