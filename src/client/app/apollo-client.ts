import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { Request } from 'express';

import { Zeus, ValueTypes, GraphQLTypes, InputType } from './types/zeus';

console.log('process.env.NEXT_PUBLIC_GRAPHQL_URL', process.env.NEXT_PUBLIC_GRAPHQL_URL)

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export const typedQuery = <Z extends ValueTypes[O], O extends 'Query'>(
  query: Z | ValueTypes[O],
  req: Request,
  operationName?: string,
) => {
  return client.query<InputType<GraphQLTypes[O], Z>>({
    query: gql(Zeus('query', query, operationName)),
    context: { headers: { Cookie: req.headers.cookie } },
  });
};

export default client;
