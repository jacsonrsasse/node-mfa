import { IUserTokenRepository } from '@domain/interfaces/repositories/user-token.repository';
import { Response } from '@domain/interfaces/use-cases/login-usecase.interface';
import {
  IRefreshTokenUseCase,
  RefreshTokenExceptions,
} from '@domain/interfaces/use-cases/refresh-token-usecase.interface';
import { IJwtService } from '@infra/jwt/jwt.interface';
import { InvalidRefreshTokenException } from '@shared/exceptions';
import { Either, left, right } from '@shared/monad/either';

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private readonly userTokenRepository: IUserTokenRepository,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(
    refreshToken: string,
  ): Promise<Either<RefreshTokenExceptions, Response>> {
    if (!this.jwtService.verify(refreshToken)) {
      left(new InvalidRefreshTokenException());
    }

    return right({
      accessToken: '',
      refreshToken: '',
    });
  }
}
