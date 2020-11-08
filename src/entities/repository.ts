export interface Repository<T> {
  add: (entity: Omit<T, 'id'>) => Promise<T>;
  getAll: () => Promise<T[]>;
}
