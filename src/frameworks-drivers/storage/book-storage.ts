import { BookStorage } from '../../entities/book/types';

export class BookStorageImplementation implements BookStorage {
  async save(): Promise<{ url: string }> {
    return { url: 'localhost/files' };
  }
}
