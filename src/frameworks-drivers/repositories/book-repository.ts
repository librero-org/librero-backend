import { Repository } from '../../entities/repository';
import { Book as EntityBook } from '../../entities/book/types';
import { PrismaClient, Book } from '@prisma/client';

export class BookPrismaRepository implements Repository<EntityBook> {
  constructor(private prisma: PrismaClient) {}

  async add(book: Omit<EntityBook, 'id'>): Promise<EntityBook> {
    const prismaBook = await this.prisma.book.create({ data: book });
    return this.nullToUndefined(prismaBook);
  }
  async getAll(): Promise<EntityBook[]> {
    const prismaBooks = await this.prisma.book.findMany();
    const books = prismaBooks.map((prismaBook) =>
      this.nullToUndefined(prismaBook),
    );
    return books;
  }
  private nullToUndefined(prismaObject: Book): EntityBook {
    const { title, isbn, url, id } = prismaObject;
    return {
      isbn: isbn !== null ? isbn : undefined,
      url: url !== null ? url : undefined,
      id,
      title,
    };
  }
}
