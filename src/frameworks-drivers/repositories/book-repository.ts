import { PrismaClient, Book as PrismaBook } from '@prisma/client';
import { Book, BookCreateInput } from '../../entities/book';
import { Repository } from '../../entities/repository';

const PLACE_HOLDER_COVER_URL = 'https://picsum.photos/260/400';

export class BookRepository implements Repository<Book> {
  constructor(private prisma: PrismaClient) {}

  async getMany({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      skip: offset,
      take: limit,
    });
    return books.map((book) => this.toEntity(book));
  }
  async save(bookCreateInput: BookCreateInput): Promise<Book> {
    const authors = bookCreateInput.authors.join('\n');
    const prismaBook = await this.prisma.book.create({
      data: { ...bookCreateInput, authors },
    });
    return this.toEntity(prismaBook);
  }
  private toEntity(prismaBook: PrismaBook): Book {
    const authors = prismaBook.authors.split('\n');
    return {
      id: prismaBook.id,
      title: prismaBook.title,
      url: prismaBook.url || undefined,
      coverUrl: prismaBook.coverUrl || PLACE_HOLDER_COVER_URL,
      authors,
    };
  }
}
