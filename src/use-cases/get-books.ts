import { Book } from '../entities/book';
import { Repository } from '../entities/repository';

export type GetBooksPort = {
  bookRepository: Repository<Book>;
};

export type GetBooksInput = {
  pagination: {
    offset: number;
    limit: number;
  };
};

export const getBooks = (
  { bookRepository }: GetBooksPort,
  { pagination: { offset = 0, limit = 12 } }: GetBooksInput,
): Promise<Book[]> => bookRepository.getMany({ offset, limit });

export const makeGetBooks = (
  port: GetBooksPort,
  input: GetBooksInput,
) => (): Promise<Book[]> => getBooks(port, input);
