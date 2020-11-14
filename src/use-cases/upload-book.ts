import { Book } from '../generated/graphql';
import { UploadBookInput, UploadBookOutputPort } from './types';

const makeUploadBook = ({
  bookStorage,
  bookRepository,
}: UploadBookOutputPort) => async ({
  book: input,
  file,
}: UploadBookInput): Promise<Book> => {
  const { url } = await bookStorage.save({ file });
  const book = await bookRepository.add({ ...input, url });
  return { ...book, url };
};

export default makeUploadBook;
