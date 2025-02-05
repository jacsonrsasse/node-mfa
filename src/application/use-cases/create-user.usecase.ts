import { Either, left, right } from '@shared/monad/either';
import { User } from '@domain/entities/user.entity';

import { IUserRepository } from '@domain/interfaces/repositories/user.repository';
import {
  ICreateUserUseCase,
  UserCreationExceptions,
} from '@domain/interfaces/use-cases/create-user-usecase.interface';

import { CreateUserDTO } from '@application/dtos/create-user.dto';

import {
  EmailAlreadyInUseException,
  UserCreationException,
} from '@shared/exceptions';
import { IEncryptgService } from '@infra/encrypt';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashingService: IEncryptgService,
  ) {}

  async execute(
    createUser: CreateUserDTO,
  ): Promise<Either<UserCreationExceptions, boolean>> {
    const userExists = await this.userRepository.findByEmail(createUser.email);
    if (userExists) {
      return left(new EmailAlreadyInUseException());
    }

    const password = await this.hashingService.encrypt(createUser.password);
    if (!password) {
      return left(new UserCreationException());
    }

    const user = User.create({
      ...createUser,
      password,
    });

    const result = await this.userRepository.create(user);
    if (!result) {
      return left(new UserCreationException());
    }

    return right(true);
  }
}
