export interface Repository<T> {
  getMany(): Promise<T[]>;
  save(entityCreateInput: Partial<T>): Promise<T>;
}
