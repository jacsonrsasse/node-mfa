import { CreateUserDTO } from '@application/dtos/create-user.dto';
import { CreateUserUseCase } from '@application/use-cases/create-user.usecase';
import { DrizzleUserRepository } from '@infra/db/drizzle/repositories/drizzle-user.repository';
import { createUserSchema } from '@infra/validators/zod/schemas/create-user.schema';
import { ZodValidator } from '@infra/validators/zod/zod.validator';
import { SignUpController } from '../controllers/signup.controller';

export class AuthControllerFacotry {
  static createSignUp() {
    const userRepository = new DrizzleUserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const createUserValidator = new ZodValidator<CreateUserDTO>(
      createUserSchema,
    );
    return new SignUpController(createUserUseCase, createUserValidator);
  }
}
