import { UserToken } from '@domain/entities/user-token.entity';
import { IBaseRepository } from './base-repository';

export interface IUserTokenRepository extends IBaseRepository<UserToken> {
  findByRefresh(refreshToken: string): Promise<UserToken | null>;
}
