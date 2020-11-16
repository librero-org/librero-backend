import { Emailer } from '../../entities/emailer';
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
}
