import { Book, BookStorage } from '../../entities/book/types';
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
) => async (input: { title: string; isbn?: string }): Promise<Book> => {
  const book = await uploadBook({ bookStorage, bookRepository })({
    book: input,
  });
  return { ...book, id: 1 };
};

const controller = { makeGetBooksController, makeUploadBookController };
export default controller;
