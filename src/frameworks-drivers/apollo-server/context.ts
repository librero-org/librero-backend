import { PrismaClient } from '@prisma/client';
import { Emailer } from '../../entities/emailer';
import { EmailerNodemailer } from '../emailer/emailer-nodemailer';
import { BookRepository } from '../repositories/book-repository';
import { baseLogger } from './logger';
const emailer = new EmailerNodemailer();

const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'warn', emit: 'event' },
  ],
});

const prismaLogger = baseLogger.child({ origin: 'PrismaClient' });
prisma.$on('query', (event) =>
  prismaLogger.debug({ event, msg: 'Prisma query' }),
);
prisma.$on('info', (event) => prismaLogger.info({ event, msg: 'Prisma info' }));
prisma.$on('warn', (event) =>
  prismaLogger.warn({ event, msg: 'Prisma warning' }),
);

const bookRepository = new BookRepository(prisma);

export interface Context {
  services: {
    emailer: Emailer;
    bookRepository: BookRepository;
  };
}

export function createContext(): Context {
  return { services: { emailer, bookRepository } };
}
