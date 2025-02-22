import { UserToken } from '@domain/entities/user-token.entity';
import { IUserTokenRepository } from '@domain/interfaces/repositories/user-token.repository';
import { Response } from '@application/interfaces/use-cases/login-usecase.interface';
import {
  IRefreshTokenUseCase,
  RefreshTokenExceptions,
} from '@application/interfaces/use-cases/refresh-token-usecase.interface';
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
      return left(new InvalidRefreshTokenException());
    }

    const userToken =
      await this.userTokenRepository.findByRefresh(refreshToken);
    if (!userToken) {
      return left(new InvalidRefreshTokenException());
    }

    const { userId } = userToken;
    const { accessToken, refreshToken: newRefreshToken } =
      await this.jwtService.sign({
        subject: userId.toString(),
      });

    await Promise.all([
      this.userTokenRepository.delete(userToken),
      this.userTokenRepository.create(
        UserToken.create({
          userId,
          refreshToken: newRefreshToken,
        }),
      ),
    ]);

    return right({
      accessToken,
      refreshToken: newRefreshToken,
    });
  }
}
