import { AuthController } from '../controllers/auth.controller';
import { CreateUserUseCase } from 'src/application/use-cases/create-user.usecase';
import { DrizzleUserRepository } from 'src/infra/db/repositories/drizzle-user.repository';
import { ZodValidator } from 'src/infra/validators/zod.validator';
import { createUserSchema } from 'src/infra/validators/schemas/create-user.schema';
import { CreateUserDTO } from 'src/application/dtos/create-user.dto';

export const makeAuthControllerFactory = (): AuthController => {
  const userRepository = new DrizzleUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  const createUserValidator = new ZodValidator<CreateUserDTO>(createUserSchema);

  return new AuthController(createUserUseCase, createUserValidator);
};
