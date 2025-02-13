import { ChangeTypeToString } from '@shared/utils/change-type-to-string.util';
import { ObjetoToType } from '@shared/utils/object-to-type.util';

export type User2faData = ObjetoToType<
  ChangeTypeToString<User2fa, 'createdAt' | 'otpValidatedAt'>
>;

export class User2fa {
  constructor(
    readonly userId: number,
    readonly type: 'one_time_password' | 'pin_email',
    readonly otpHash?: string,
    readonly otpValidatedAt?: Date,
    readonly createdAt?: Date,
  ) {}

  static create(user2faData: User2faData) {
    const { userId, type, otpHash } = user2faData;
    const otpValidatedAt =
      user2faData.otpValidatedAt && new Date(user2faData.otpValidatedAt);
    const createdAt = user2faData.createdAt && new Date(user2faData.createdAt);

    return new User2fa(userId, type, otpHash, otpValidatedAt, createdAt);
  }
}
