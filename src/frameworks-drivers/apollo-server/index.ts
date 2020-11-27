import { ApolloServer } from 'apollo-server';
import { createContext } from './context';
import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';
import { baseLogger, loggerPlugin } from './logger';
import { mocks } from './mocks';

export const server = new ApolloServer({
  context: createContext,
  plugins: [loggerPlugin],
  logger: baseLogger.child({ origin: 'ApolloServer' }),
  typeDefs,
  resolvers,
  mocks,
});
