import { ChangeTypeToString } from '@shared/utils/change-type-to-string.util';
import { ObjetoToType } from '@shared/utils/object-to-type.util';

export type User2faData = ObjetoToType<
  ChangeTypeToString<User2fa, 'createdAt' | 'validatedAt'>
>;

export class User2fa {
  constructor(
    readonly userId: number,
    readonly hash: string,
    readonly validatedAt?: Date,
    readonly createdAt?: Date,
  ) {}

  static create(user2faData: User2faData) {
    const { userId, hash } = user2faData;
    const validatedAt =
      user2faData.validatedAt && new Date(user2faData.validatedAt);
    const createdAt = user2faData.createdAt && new Date(user2faData.createdAt);

    return new User2fa(userId, hash, validatedAt, createdAt);
  }
}
