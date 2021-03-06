export type ID = string | number;
export type Book = {
  id: ID;
  title: string;
  authors: string[];
  url?: string;
  coverUrl: string;
};
export type BookCreateInput = {
  title: string;
  authors: string[];
  url?: string;
};
