import { LoginDTO } from '@application/dtos/login.dto';
import { UnauthorizedByCredentials } from '@shared/exceptions';
import { Either } from '@shared/monad/either';

export type Response = {
  accessToken: string;
  refreshToken: string;
};

export interface ILoginUseCase {
  execute(
    login: LoginDTO,
  ): Promise<Either<UnauthorizedByCredentials, Response>>;
}
