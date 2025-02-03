import { CreateUserDTO } from '@application/dtos/create-user.dto';
import { CreateUserUseCase } from '@application/use-cases/create-user.usecase';
import { DrizzleUserRepository } from '@infra/db/drizzle/repositories/drizzle-user.repository';
import { createUserSchema } from '@infra/validators/zod/schemas/create-user.schema';
import { ZodValidator } from '@infra/validators/zod/zod.validator';
import { SignUpController } from '../controllers/signup.controller';
import { BcryptJsHashingService } from '@infra/hashing';
import { LoginController } from '@presentation/controllers/login.controller';
import { LoginDTO } from '@application/dtos/login.dto';
import { loginSchema } from '@infra/validators/zod/schemas/login.schema';
import { LoginUseCase } from '@application/use-cases/login.usecase';
import { JwtService } from '@infra/jwt/jwt.service';

export class AuthControllerFacotry {
  static createSignUp() {
    const hashingService = new BcryptJsHashingService();
    const userRepository = new DrizzleUserRepository();
    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      hashingService,
    );

    const createUserValidator = new ZodValidator<CreateUserDTO>(
      createUserSchema,
    );
    return new SignUpController(createUserUseCase, createUserValidator);
  }

  static createLogin() {
    const hashingService = new BcryptJsHashingService();
    const userRepository = new DrizzleUserRepository();
    const jwtService = new JwtService();
    const loginUseCase = new LoginUseCase(
      userRepository,
      hashingService,
      jwtService,
    );
    const loginValidator = new ZodValidator<LoginDTO>(loginSchema);
    return new LoginController(loginUseCase, loginValidator);
  }
}
