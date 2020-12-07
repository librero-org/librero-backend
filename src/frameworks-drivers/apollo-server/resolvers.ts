/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { GraphqlController } from '../../delivery/controllers';
import { Book, Resolvers } from '../../generated/graphql';
export const resolvers: Resolvers = {
  Query: {
    hello: (): string => 'world',
    books: (_root, { pagination, orderBy }, { services }): Promise<Book[]> =>
      GraphqlController.getBooks(services.bookRepository, pagination, orderBy),
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
    uploadBook: async (
      _root,
      { data },
      { services: { fileStorage, bookRepository } },
    ): Promise<Book> => {
      const file = await data.file;
      const result = await GraphqlController.uploadBook(
        { fileStorage, bookRepository },
        {
          file: { ...file, readStream: file.createReadStream() },
          bookCreateInput: data.book,
        },
      );
      return result;
    },
  },
};
