import { ApolloServer } from 'apollo-server';
import { createContext } from './context';
import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';
import { loggerPlugin } from './logger';

export const server = new ApolloServer({
  context: createContext,
  plugins: [loggerPlugin],
  typeDefs,
  resolvers,
});
