import { Book, SaveBookInput } from './types';

const saveBook = ({ book, bookRepository }: SaveBookInput): Promise<Book> => {
  return bookRepository.add(book);
};

export default saveBook;
