/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { GraphqlController } from '../../delivery/controllers';
import { Book, Resolvers } from '../../generated/graphql';
export const resolvers: Resolvers = {
  Query: {
    hello: (): string => 'world',
    books: (_root, _args, { services }): Promise<Book[]> =>
      GraphqlController.getBooks(services.bookRepository),
  },
  Mutation: {
    sendContactEmail: async (
      _root,
      { data },
      { services },
    ): Promise<boolean> => {
      const result = await GraphqlController.sendContactEmail(
        services.emailer,
        data,
      );
      return result;
    },
  },
};
