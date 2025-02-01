import { User } from 'src/domain/entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<boolean>;

  findByEmail(email: string): Promise<User | null>;
}
