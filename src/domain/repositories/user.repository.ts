import { Either } from 'src/shared';
import { User } from '../entities/user.entity';
import { UserNotFoundByCredentials } from '../exceptions/user-not-found-by-credentials.exception';
import { UserCreationFailed } from '../exceptions/user-creation-failed.exception';

export interface UserRepository {
  create(user: User): Promise<Either<UserCreationFailed, boolean>>;

  findByEmail(email: string): Promise<Either<UserNotFoundByCredentials, User>>;
}
