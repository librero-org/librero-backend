export interface Repository<T> {
  getMany(options: { offset: number; limit: number }): Promise<T[]>;
  save(entityCreateInput: Partial<T>): Promise<T>;
}
