import { PrismaClient, Book as PrismaBook } from '@prisma/client';
import { Book, BookCreateInput } from '../../entities/book';
import { Repository } from '../../entities/repository';

const PLACE_HOLDER_COVER_URL = 'https://picsum.photos/260/400';

export class BookRepository implements Repository<Book> {
  constructor(private prisma: PrismaClient) {}

  async getMany({
    offset,
    limit,
    orderBy,
  }: {
    offset: number;
    limit: number;
    orderBy?: {
      [P in keyof Book]?: 'ASC' | 'DESC';
    };
  }): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      skip: offset,
      take: limit,
      orderBy: this.mapOrderByObject(orderBy),
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
  private mapOrderByObject(
    orderBy: {
      [P in keyof Book]?: 'ASC' | 'DESC';
    } = {},
  ) {
    if (!orderBy) return undefined;
    return Object.fromEntries(
      Object.entries(orderBy).map(([k, v]) => {
        if (v === 'ASC') return [k, 'asc'];
        if (v === 'DESC') return [k, 'desc'];
        return [k, undefined];
      }),
    );
  }
}
