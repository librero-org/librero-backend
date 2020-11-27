import nodemailer from 'nodemailer';
import { Email, Emailer } from '../../entities/emailer';

const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = Number(process.env.EMAIL_PORT);
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

export class EmailerNodemailer implements Emailer {
  async sendEmail({ from, to, subject, text }: Email): Promise<string> {
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
    const info = await transporter.sendMail({ from, to, subject, text });
    return JSON.stringify(info);
  }
}
