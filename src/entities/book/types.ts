import { File } from '../file';
import { Repository } from '../repository';

export type Book = {
  id: number;
  title: string;
  isbn?: string;
  url?: string;
};

export interface BookStorage {
  save: (args: { file: File }) => Promise<{ url: string }>;
}

export type SaveBookInput = {
  book: Book;
  bookRepository: Repository<Book>;
};
