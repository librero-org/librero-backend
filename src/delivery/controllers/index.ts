import { Book, BookStorage } from '../../entities/book/types';
import { File } from '../../entities/file';
import { Repository } from '../../entities/repository';
import uploadBook from '../../use-cases/upload-book';

const makeGetBooksController = (
  bookRepository: Repository<Book>,
) => async (): Promise<Book[]> => {
  const books = await bookRepository.getAll();
  return books.map((book) => ({ ...book, id: 1 }));
};

const makeUploadBookController = (
  bookRepository: Repository<Book>,
  bookStorage: BookStorage,
) => async (
  book: {
    title: string;
    isbn?: string;
  },
  file: File,
): Promise<Book> => {
  const persistedBook = await uploadBook({ bookStorage, bookRepository })({
    book,
    file,
  });
  return { ...persistedBook, id: 1 };
};

const controller = { makeGetBooksController, makeUploadBookController };
export default controller;
