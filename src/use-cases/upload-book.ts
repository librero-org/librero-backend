import { Book, BookCreateInput } from '../entities/book';
import { File, FileStorage } from '../entities/file';
import { Repository } from '../entities/repository';

const SUPPORTED_FILE_EXTENSIONS = ['txt', 'epub', 'kpub', 'mobi', 'rtf', 'pdf'];
const SUPPORTED_MIME_TYPES = [
  'application/pdf',
  'text/plain',
  'text/html',
  'text/rtf',
];

export type UploadBookInput = {
  bookCreateInput: BookCreateInput;
  file: File;
};
export type UploadBookPort = {
  fileStorage: FileStorage;
  bookRepository: Repository<Book>;
};

export const uploadBook = async (
  { fileStorage, bookRepository }: UploadBookPort,
  { file, bookCreateInput }: UploadBookInput,
): Promise<Book> => {
  const fileExtension = file.filename.split('.').pop()?.toLowerCase() || 'unk';

  if (
    SUPPORTED_FILE_EXTENSIONS.find(
      (supportedFileExtension) => supportedFileExtension === fileExtension,
    ) === undefined
  ) {
    throw new Error(`Unsupported file extension: ${fileExtension}`);
  }
  if (
    SUPPORTED_MIME_TYPES.find(
      (supportedMimeType) => supportedMimeType === file.mimetype,
    ) === undefined
  ) {
    throw new Error(`Unsupported file type: ${file.mimetype}`);
  }

  const normalizedTitle = bookCreateInput.title
    .toLowerCase()
    .replace(/\s/, '_');
  const normalizedAuthors = bookCreateInput.authors
    .map((author) => author.toLowerCase().replace(/\s/, '_'))
    .join('-');
  const path = `${normalizedAuthors}/${normalizedTitle}.${fileExtension}`;

  const { url } = await fileStorage.upload(file, path);

  return bookRepository.save({ ...bookCreateInput, url });
};

export const makeUploadBook = (port: UploadBookPort) => (
  input: UploadBookInput,
): Promise<Book> => uploadBook(port, input);
