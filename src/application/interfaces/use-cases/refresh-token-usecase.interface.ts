import { Either } from '@shared/monad/either';
import { InvalidRefreshTokenException } from '@shared/exceptions';
import { Response } from './login-usecase.interface';

export type RefreshTokenExceptions = InvalidRefreshTokenException;

export interface IRefreshTokenUseCase {
  execute(
    refreshToken: string,
  ): Promise<Either<RefreshTokenExceptions, Response>>;
}
