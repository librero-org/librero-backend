import { Book } from '../entities/book';
import { Repository } from '../entities/repository';

export type GetBooksPort = {
  bookRepository: Repository<Book>;
};

export const getBooks = ({ bookRepository }: GetBooksPort): Promise<Book[]> =>
  bookRepository.getMany();

export const makeGetBooks = (port: GetBooksPort) => (): Promise<Book[]> =>
  getBooks(port);
