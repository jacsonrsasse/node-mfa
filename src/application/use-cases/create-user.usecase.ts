import { Either, left, right } from '@shared/monad/either';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';

import { EmailAlreadyInUseException } from 'src/application/exceptions/email-already-in-use.exception';
import { UserCreationFailed } from 'src/application/exceptions/user-creation.exception';

import {
  CreateUserUseCase as UseCase,
  UserCreationExceptions,
} from '../interfaces/use-cases/create-user-usecase.interface';
import { CreateUserDTO } from '../dtos/create-user.dto';

export class CreateUserUseCase implements UseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    createUser: CreateUserDTO,
  ): Promise<Either<UserCreationExceptions, boolean>> {
    const userExists = await this.userRepository.findByEmail(createUser.email);
    if (userExists) {
      return left(new EmailAlreadyInUseException());
    }

    const user = User.create(createUser);

    const result = await this.userRepository.create(user);
    if (!result) {
      return left(new UserCreationFailed());
    }

    return right(true);
  }
}
