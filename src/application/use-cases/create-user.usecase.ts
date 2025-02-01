import { Either, left, right } from '@shared/monad/either';
import { User } from '@domain/entities/user.entity';

import { IUserRepository } from '@application/interfaces/repositories/user.repository';
import {
  ICreateUserUseCase,
  UserCreationExceptions,
} from '@application/interfaces/use-cases/create-user-usecase.interface';

import { CreateUserDTO } from '@application/dtos/create-user.dto';

import { EmailAlreadyInUseException } from '@application/exceptions/email-already-in-use.exception';
import { UserCreationException } from '@application/exceptions/user-creation.exception';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

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
      return left(new UserCreationException());
    }

    return right(true);
  }
}
