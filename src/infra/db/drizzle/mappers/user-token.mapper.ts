import { UserToken, UserTokenData } from '@domain/entities/user-token.entity';

export class UserTokenMapper {
  static fromRepository(userData: UserTokenData): UserToken {
    return UserToken.create(userData);
  }

  static toRepository({ userId, refreshToken, expiresAt }: UserToken) {
    const year = expiresAt.getFullYear();
    const month = expiresAt.getMonth().toString().padStart(2, '0');
    const day = expiresAt.getDate().toString().padStart(2, '0');
    const hours = expiresAt.getHours().toString().padStart(2, '0');
    const minutes = expiresAt.getMinutes().toString().padStart(2, '0');
    const seconds = expiresAt.getSeconds().toString().padStart(2, '0');

    return {
      userId,
      refreshToken,
      expiresAt: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
    };
  }
}
