import { Repository } from '../repository';

export type Book = {
  id: number;
  title: string;
  isbn?: string;
  url?: string;
};

export interface BookStorage {
  save: (book: Book) => Promise<{ url: string }>;
}

export type SaveBookInput = {
  book: Book;
  bookRepository: Repository<Book>;
};
