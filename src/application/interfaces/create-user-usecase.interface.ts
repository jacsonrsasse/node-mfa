import { Either } from '@shared/monad/either';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserCreationException } from 'src/domain/exceptions/user-creation.exception';
import { EmailAlreadyInUseException } from 'src/domain/exceptions/email-already-in-use.exception';

export type UserCreationExceptions =
  | EmailAlreadyInUseException
  | UserCreationException;

export interface CreateUserUseCase {
  execute(
    createUser: CreateUserDTO,
  ): Promise<Either<UserCreationExceptions, boolean>>;
}
