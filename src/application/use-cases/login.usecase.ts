import { LoginDTO } from '@application/dtos/login.dto';
import { IUserRepository } from '@application/interfaces/repositories/user.repository';
import {
  ILoginUseCase,
  Response,
} from '@application/interfaces/use-cases/login-usecase.interface';
import { IHashingService } from '@infra/hashing';
import { IJwtService } from '@infra/jwt/jwt.interface';
import { UnauthorizedByCredentials } from '@shared/exceptions';
import { Either, left, right } from '@shared/monad/either';

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashingService: IHashingService,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(
    login: LoginDTO,
  ): Promise<Either<UnauthorizedByCredentials, Response>> {
    const user = await this.userRepository.findByEmail(login.email);
    if (!user) {
      return left(new UnauthorizedByCredentials());
    }

    const matchPassword = await this.hashingService.compare(
      login.password,
      user.password,
    );
    if (!matchPassword) {
      return left(new UnauthorizedByCredentials());
    }

    const token = await this.jwtService.sign(
      {},
      {
        subject: user.id.toString(),
      },
    );
    const refreshToken = await this.jwtService.sign(
      {},
      {
        subject: user.id.toString(),
        expiresIn: '7d',
      },
    );
    return right({
      token,
      refreshToken,
    });
  }
}
