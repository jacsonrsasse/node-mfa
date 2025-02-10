import { CreateUserDTO } from '@application/dtos/create-user.dto';
import { CreateUserUseCase } from '@application/use-cases/create-user.usecase';
import { DrizzleUserRepository } from '@infra/db/drizzle/repositories/drizzle-user.repository';
import { createUserSchema } from '@infra/validators/zod/schemas/create-user.schema';
import { ZodValidator } from '@infra/validators/zod/zod.validator';
import { SignUpController } from '../controllers/signup.controller';
import { NodeEncryptService } from '@infra/encrypt';
import { LoginController } from '@presentation/controllers/login.controller';
import { LoginDTO } from '@application/dtos/login.dto';
import { loginSchema } from '@infra/validators/zod/schemas/login.schema';
import { LoginUseCase } from '@application/use-cases/login.usecase';
import { JwtService } from '@infra/jwt/jwt.service';
import { DrizzleUserTokenRepository } from '@infra/db/drizzle/repositories/drizzle-user-token.repository';
import { RefreshController } from '@presentation/controllers/refresh.controller';
import { RefreshTokenUseCase } from '@application/use-cases/refresh-token.usecase';
import { refreshTokenSchema } from '@infra/validators/zod/schemas/refresh-token.schema';

const hashingService = new NodeEncryptService();
const jwtService = new JwtService();
const userRepository = new DrizzleUserRepository();
const userTokenRepository = new DrizzleUserTokenRepository();

export class AuthControllerFacotry {
  static createSignUp() {
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
    const loginUseCase = new LoginUseCase(
      userRepository,
      userTokenRepository,
      hashingService,
      jwtService,
    );
    const loginValidator = new ZodValidator<LoginDTO>(loginSchema);
    return new LoginController(loginUseCase, loginValidator);
  }

  static createRefreshToken() {
    const refreshTokenUseCase = new RefreshTokenUseCase(
      userTokenRepository,
      jwtService,
    );
    const refreshTokenValidator = new ZodValidator<{ refreshToken: string }>(
      refreshTokenSchema,
    );

    return new RefreshController(refreshTokenUseCase, refreshTokenValidator);
  }
}
