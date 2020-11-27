import { Book } from '../../entities/book';
import { Emailer } from '../../entities/emailer';
import { Repository } from '../../entities/repository';
import { makeGetBooks } from '../../use-cases/get-books';
import { makeSendEmail } from '../../use-cases/send-email';

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
  static async getBooks(bookRepository: Repository<Book>): Promise<Book[]> {
    const useCase = makeGetBooks({ bookRepository });
    const books = await useCase();
    return books;
  }
}
