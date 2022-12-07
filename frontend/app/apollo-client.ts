import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

import { Zeus, ValueTypes, GraphQLTypes, InputType } from './types/zeus';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

export const typedQuery = <Z extends ValueTypes[O], O extends 'Query'>(
  query: Z | ValueTypes[O],
  req: Request,
  operationName?: string,
) => {
  return client.query<InputType<GraphQLTypes[O], Z>>({
    query: gql(Zeus('query', query, operationName)),
    // @ts-ignore
    context: { headers: { Cookie: req.headers.cookie } },
  });
};

export default client;
