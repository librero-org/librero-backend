import { Book } from '../../entities/book';
import { Emailer } from '../../entities/emailer';
import { Repository } from '../../entities/repository';
import { makeGetBooks } from '../../use-cases/get-books';
import { makeSendEmail } from '../../use-cases/send-email';
import {
  makeUploadBook,
  UploadBookInput,
  UploadBookPort,
} from '../../use-cases/upload-book';

export class GraphqlController {
  static async sendContactEmail(
    emailer: Emailer,
    data: { fromName: string; fromEmailAddress: string; message: string },
  ): Promise<boolean> {
    const useCase = makeSendEmail({ emailer });
    const info = await useCase(data);
    console.log('send email info', info);
    return !!info;
  }
  static async getBooks(
    bookRepository: Repository<Book>,
    pagination: { offset: number; limit: number },
    orderBy?: { [P in keyof Book]?: 'ASC' | 'DESC' },
  ): Promise<Book[]> {
    const useCase = makeGetBooks({ bookRepository });
    const books = await useCase({ pagination, orderBy });
    return books;
  }
  static async uploadBook(
    port: UploadBookPort,
    input: UploadBookInput,
  ): Promise<Book> {
    const useCase = makeUploadBook(port);
    const book = await useCase(input);
    return { ...book, coverUrl: '' };
  }
}
