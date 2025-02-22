export interface IBaseRepository<E> {
  create(entity: E): Promise<boolean>;

  update(entity: E): Promise<boolean>;

  delete(entity: E): Promise<boolean>;
}
