import { Book } from '../generated/graphql';
import { UploadBookInput, UploadBookOutputPort } from './types';

const makeUploadBook = ({
  bookStorage,
  bookRepository,
}: UploadBookOutputPort) => async ({
  book: input,
}: UploadBookInput): Promise<Book> => {
  const book = await bookRepository.add(input);
  const { url } = await bookStorage.save(book);
  return { ...book, url };
};

export default makeUploadBook;
