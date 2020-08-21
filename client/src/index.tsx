import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

import injectStyles from './styles';
import { cache } from './cache';


// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4001',
  name: 'web',
  version: '1.0'
});

/**
 * Render our app
 * - We wrap the whole app with ApolloProvider, so any component in the app can
 *    make GraphqL requests. Our provider needs the client we created above,
 *    so we pass it as a prop
 * - We need a router, so we can navigate the app. We're using Reach router for this.
 *    The router chooses between which component to render, depending on the url path.
 *    ex: localhost:3000/login will render only the `Login` component
 */

const GET_ME = gql`
  query GetMe {
    me {
      age
      id
      floor4
    }
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(GET_ME);
  return null;
}

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById('root'),
);
