import { PrismaClient, Book as PrismaBook } from '@prisma/client';
import { Book } from '../../entities/book';
import { Repository } from '../../entities/repository';

export class BookRepository implements Repository<Book> {
  constructor(private prisma: PrismaClient) {}

  async getMany(): Promise<Book[]> {
    const books = await this.prisma.book.findMany();
    return books.map((book) => this.toEntity(book));
  }
  private toEntity(prismaBook: PrismaBook): Book {
    const authors = prismaBook.authors.split('\n');
    return {
      id: prismaBook.id,
      title: prismaBook.title,
      url: prismaBook.url || undefined,
      authors,
    };
  }
}
