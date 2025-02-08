import { UserToken, UserTokenData } from '@domain/entities/user-token.entity';

export class UserTokenMapper {
  static fromRepository(userData: UserTokenData): UserToken {
    return UserToken.create(userData);
  }

  static toRepository({ userId, refreshToken }: UserToken) {
    return {
      userId,
      refreshToken,
    };
  }
}
