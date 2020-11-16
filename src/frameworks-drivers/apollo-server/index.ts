import { ApolloServer } from 'apollo-server';
import { createContext } from './context';
import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';

export const server = new ApolloServer({
  context: createContext,
  typeDefs,
  resolvers,
});
