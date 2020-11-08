import { Book } from '../entities/book/types';
import { GetBooksInput } from './types';

const getBooks = ({ bookRepository }: GetBooksInput): Promise<Book[]> => {
  return bookRepository.getAll();
};

export default getBooks;
