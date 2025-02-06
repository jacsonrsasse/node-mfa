import { LoginDTO } from '@application/dtos/login.dto';
import { IUserRepository } from '@domain/interfaces/repositories/user.repository';
import {
  ILoginUseCase,
  Response,
} from '@domain/interfaces/use-cases/login-usecase.interface';
import { IEncryptgService } from '@infra/encrypt';
import { IJwtService } from '@infra/jwt/jwt.interface';
import { UnauthorizedByCredentials } from '@shared/exceptions';
import { Either, left, right } from '@shared/monad/either';

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashingService: IEncryptgService,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(
    login: LoginDTO,
  ): Promise<Either<UnauthorizedByCredentials, Response>> {
    const user = await this.userRepository.findByEmail(login.email);
    if (!user) {
      return left(new UnauthorizedByCredentials());
    }

    const decrypted = await this.hashingService.decrypt(user.password);
    if (!decrypted || decrypted !== login.password) {
      return left(new UnauthorizedByCredentials());
    }

    const token = await this.jwtService.sign({
      options: {
        subject: user.id.toString(),
        type: 'access',
      },
    });
    const refreshToken = await this.jwtService.sign({
      options: {
        subject: user.id.toString(),
        expiresIn: '1d',
        type: 'refresh',
      },
    });
    return right({
      token,
      refreshToken,
    });
  }
}
