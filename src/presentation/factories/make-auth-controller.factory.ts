import { CreateUser } from 'src/application/interfaces/create-user.interface';
import { AuthController } from '../controllers/auth.controller';
import { CreateUserUseCase } from 'src/application/use-cases/create-user.usecase';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { DrizzleUserRepository } from 'src/infra/db/repositories/drizzle-user.repository';
import { ZodValidator } from 'src/infra/validators/zod.validator';
import { createUserSchema } from 'src/infra/validators/schemas/create-user.schema';
import { CreateUserDTO } from 'src/application/dtos/create-user.dto';

export const makeAuthControllerFactory = (): AuthController => {
  const userRepository: UserRepository = new DrizzleUserRepository();
  const createUserUseCase: CreateUser = new CreateUserUseCase(userRepository);

  const createUserValidator = new ZodValidator<CreateUserDTO>(createUserSchema);

  return new AuthController(createUserUseCase, createUserValidator);
};
