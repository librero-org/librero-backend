import { Book, BookStorage } from '../entities/book/types';
import { Repository } from '../entities/repository';

export type UploadBookInput = {
  book: CreateBookImput;
};

export type CreateBookImput = Omit<Book, 'id'>;

export type UploadBookOutputPort = {
  bookStorage: BookStorage;
  bookRepository: Repository<Book>;
};

export type GetBooksInput = {
  bookRepository: Repository<Book>;
};
