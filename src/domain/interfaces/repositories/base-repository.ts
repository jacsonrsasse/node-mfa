export interface IBaseRepository<E> {
  create(user: E): Promise<boolean>;
}
