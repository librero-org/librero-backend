import { ReadStream } from 'fs-capacitor';

export type File = {
  filename: string;
  mimetype: string;
  encoding: string;
  readStream: ReadStream;
};

export interface FileStorage {
  upload(file: File, path: string): Promise<{ url: string }>;
}
