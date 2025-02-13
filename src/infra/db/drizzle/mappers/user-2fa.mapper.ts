import { User2fa, User2faData } from '@domain/entities/user-2fa.entity';
import { dateToSqliteString } from '@shared/utils/date-to-sqlite-string.util';

export class User2faMapper {
  static fromRepository(user2faData: User2faData): User2fa {
    return User2fa.create(user2faData);
  }

  static toRepository({
    userId,
    type,
    otpHash,
    otpValidatedAt,
  }: User2fa): User2faData {
    return {
      userId,
      type,
      otpHash,
      otpValidatedAt: dateToSqliteString(otpValidatedAt),
    };
  }
}
