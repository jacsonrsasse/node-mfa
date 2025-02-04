import { User } from 'src/domain/entities/user.entity';
import { IBaseRepository } from './base-repository';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
