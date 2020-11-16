import { Emailer } from '../entities/emailer';
const EMAIL_BASE_ADDRESS =
  process.env.EMAIL_BASE_ADDRESS || 'librero-org@protonmail.com';
export type SendEmailInput = {
  fromEmailAddress: string;
  fromName: string;
  message: string;
};

export type SendEmailPort = {
  emailer: Emailer;
};
export const makeSendEmail = ({ emailer }: SendEmailPort) => ({
  fromName,
  fromEmailAddress,
  message,
}: SendEmailInput): Promise<string> => {
  const text = `Nombre: ${fromName}\ne-mail: ${fromEmailAddress}\nMensaje: ${message}`;
  return emailer.sendEmail({
    from: EMAIL_BASE_ADDRESS,
    to: EMAIL_BASE_ADDRESS,
    subject: 'Un usuario ha enviado un mensaje',
    text,
  });
};
