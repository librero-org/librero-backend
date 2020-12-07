export interface Repository<T> {
  getMany(options: {
    offset: number;
    limit: number;
    orderBy?: {
      [P in keyof T]?: 'ASC' | 'DESC';
    };
  }): Promise<T[]>;
  save(entityCreateInput: Partial<T>): Promise<T>;
}
