export type Email = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

export interface Emailer {
  sendEmail: (data: Email) => Promise<string>;
}
