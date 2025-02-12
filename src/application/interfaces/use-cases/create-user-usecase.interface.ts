import { CreateUserDTO } from '@application/dtos/create-user.dto';
import { Either } from '@shared/monad/either';
import {
  EmailAlreadyInUseException,
  UserCreationException,
} from '@shared/exceptions';

export type UserCreationExceptions =
  | EmailAlreadyInUseException
  | UserCreationException;

export interface ICreateUserUseCase {
  execute(
    createUser: CreateUserDTO,
  ): Promise<Either<UserCreationExceptions, boolean>>;
}
