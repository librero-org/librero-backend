import { S3 } from 'aws-sdk';
import { File, FileStorage } from '../../entities/file';
export class FileStorageS3 implements FileStorage {
  private s3: S3;
  private bucket: string;
  constructor(bucket: string) {
    this.s3 = new S3();
    this.bucket = bucket;
  }
  async upload(file: File, path: string): Promise<{ url: string }> {
    const { Location } = await this.s3
      .upload({
        Bucket: this.bucket,
        Key: path,
        Body: file.readStream,
      })
      .promise();

    return { url: Location };
  }
}
