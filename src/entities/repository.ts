export interface Repository<T> {
  getMany(): Promise<T[]>;
}
