import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'node-fetch';

const urlService = 'http://localhost:5001/';

const httpLink = new HttpLink({
  uri: urlService,
  //uri: 'http://localhost:5000/',
  credentials: 'include',
  fetch,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      securityWord: 'test',
    },
  };
});

const client = () => new ApolloClient({
  // ssrMode: typeof window === 'undefined',
  connectToDevTools: true,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
