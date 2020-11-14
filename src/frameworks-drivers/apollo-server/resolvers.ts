import { Book, Resolvers, UploadFileInput } from '../../generated/graphql';
import { BookPrismaRepository } from '../repositories/book-repository';
import { BookStorageImplementation } from '../storage/book-storage';
import { Context } from './context';
import controller from '../../delivery/controllers';
export const resolvers: Resolvers = {
  Query: {
    books: async (
      _root: unknown,
      _args: unknown,
      { prisma }: Context,
    ): Promise<Book[]> => {
      const bookRepository = new BookPrismaRepository(prisma);
      const books = await controller.makeGetBooksController(bookRepository)();
      return books;
    },
  },
  Mutation: {
    uploadBook: async (
      _root: unknown,
      {
        data: { bookCreateInput, file: filePromise },
      }: { data: UploadFileInput },
      { prisma }: Context,
    ): Promise<Book> => {
      const bookRepository = new BookPrismaRepository(prisma);
      const bookStorage = new BookStorageImplementation();
      const file = await filePromise;
      const readStream = file.createReadStream();
      const book = await controller.makeUploadBookController(
        bookRepository,
        bookStorage,
      )(bookCreateInput, { ...file, readStream });
      return book;
    },
  },
};

export default resolvers;
