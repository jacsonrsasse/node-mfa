import { ChangeTypeToString } from '@shared/utils/change-type-to-string.util';
import { ObjetoToType } from '@shared/utils/object-to-type.util';

export type UserTokenData = ObjetoToType<
  ChangeTypeToString<UserToken, 'createdAt'>
>;

export class UserToken {
  constructor(
    readonly userId: number,
    readonly refreshToken: string,
    readonly createdAt?: Date,
  ) {}

  static create(userTokenData: UserTokenData): UserToken {
    const { userId, refreshToken } = userTokenData;

    let createdAt: Date | undefined;
    if (userTokenData.createdAt) {
      createdAt = new Date(userTokenData.createdAt);
    }

    return new UserToken(userId, refreshToken, createdAt);
  }
}
