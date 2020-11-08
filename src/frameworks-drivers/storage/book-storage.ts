// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import storj from 'uplink-nodejs';
import { BookStorage } from '../../entities/book/types';

export class BookStorageImplementation implements BookStorage {
  async save(): Promise<{ url: string }> {
    const libUplink = new storj.Uplink();

    return { url: 'localhost/files' };
  }
}
