import { ReadStream } from 'fs-capacitor';

export type File = {
  filename: string;
  mimetype: string;
  encoding: string;
  readStream: ReadStream;
};
