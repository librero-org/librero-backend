import { Emailer } from '../../entities/emailer';
import { EmailerNodemailer } from '../emailer/emailer-nodemailer';

const emailer = new EmailerNodemailer();

export interface Context {
  services: {
    emailer: Emailer;
  };
}

export function createContext(): Context {
  return { services: { emailer } };
}
