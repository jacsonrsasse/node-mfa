import { Either } from '@shared/monad/either';
import { UserCreationFailed } from 'src/domain/exceptions/user-creation-failed.exception';
import { CreateUserUseCase as CreateUser } from '../interfaces/create-user-usecase.interface';
import { UserRepository } from 'src/domain/repositories/user.repository';

export class CreateUserUseCase implements CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<Either<UserCreationFailed, boolean>> {
    throw new Error('Method not implemented.');
  }
}
