import { Either } from '@shared/monad/either';
import { UserCreationFailed } from 'src/domain/exceptions/user-creation-failed.exception';

export interface CreateUserUseCase {
  execute(): Promise<Either<UserCreationFailed, boolean>>;
}
