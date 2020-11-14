// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import storj from 'uplink-nodejs';
import { ReadStream } from 'fs-capacitor';
import { BookStorage } from '../../entities/book/types';
import { File } from '../../entities/file';

const storjConfig = {
  apiKey:
    '13Yqf3sFQDDkFRWHWmwg7MFeVv6eANdNBcwFKcraMhreG1Esp4BoQpG3HjgwYm1QzLtY6oGxnmb3xFiLPPLYPYofg8medbngRWfBa7Q',
  satelliteURL: 'us-central-1.tardigrade.io:7777',
  encryptionPassphrase: "you'll never guess this",
  bucketName: 'librero-books-bucket',
  uploadPath: 'book2.txt',
};

export class BookStorageImplementation implements BookStorage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async setupBucket(project: any) {
    try {
      const bucket = await project.statBucket(storjConfig.bucketName);
      console.log('statBucket', { bucket });
      return bucket;
    } catch (error) {
      console.warn(error);
      if (error.code === 19) {
        const bucket = await project.createBucket(storjConfig.bucketName);
        console.log({ bucket });
        return bucket;
      }
      throw error;
    }
  }
  private async bufferFromReadStream(readStream: ReadStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      readStream.on('data', (chunk) => {
        if (typeof chunk === 'string') {
          chunks.push(Buffer.from(chunk));
        } else {
          chunks.push(chunk);
        }
      });
      readStream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer);
      });
      readStream.on('error', (err) => {
        reject(err);
      });
    });
  }
  async save({ file }: { file: File }): Promise<{ url: string }> {
    try {
      const libUplink = new storj.Uplink();
      // create access handle
      const access = await libUplink.requestAccessWithPassphrase(
        storjConfig.satelliteURL,
        storjConfig.apiKey,
        storjConfig.encryptionPassphrase,
      );
      console.log({ access });

      const project = await access.openProject();
      console.log({ project });

      const bucket = await this.setupBucket(project);
      console.log({ bucket });

      const ensure = await project.ensureBucket(storjConfig.bucketName);
      console.log({ ensure });

      const uploadOptions = new storj.UploadOptions();
      console.log({ uploadOptions });

      const uploadObject = await project.uploadObject(
        file.filename,
        storjConfig.uploadPath,
        uploadOptions,
      );
      console.log(uploadObject);

      const buffer = await this.bufferFromReadStream(file.readStream);
      const bytes = buffer.byteLength;
      const upload = await uploadObject.write(buffer, bytes);
      console.log({ upload });
      const commit = await uploadObject.commit();
      console.log({ commit });
      const uploadInfo = await uploadObject.info();
      console.log({ uploadInfo });

      const listObjectsOptions = new storj.ListObjectsOptions();
      console.log({ listObjectsOptions });
      const list = await project.listObjects(
        storjConfig.bucketName,
        listObjectsOptions,
      );
      console.log({ list });
      await project.close();
    } catch (error) {
      console.error(error);
    }

    return { url: `${storjConfig.bucketName}/${storjConfig.uploadPath}` };
  }
}
