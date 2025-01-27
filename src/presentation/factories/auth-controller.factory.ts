import { CreateUserDTO } from 'src/application/dtos/create-user.dto';
import { CreateUserUseCase } from 'src/application/use-cases/create-user.usecase';
import { DrizzleUserRepository } from 'src/infra/db/repositories/drizzle-user.repository';
import { createUserSchema } from 'src/infra/validators/schemas/create-user.schema';
import { ZodValidator } from 'src/infra/validators/zod.validator';
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
