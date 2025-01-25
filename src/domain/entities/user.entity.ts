import { ChangeTypeToString } from '@shared/utils/change-type-to-string.util';
import { ObjetoToType } from '@shared/utils/object-to-type.util';

export type UserData = ObjetoToType<ChangeTypeToString<User, 'createdAt'>>;

export class User {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly id?: number,
    readonly createdAt?: Date,
  ) {}

  static create(userData: UserData): User {
    const { name, email, password, id } = userData;

    let createdAt: Date | undefined;
    if (userData.createdAt) {
      createdAt = new Date(userData.createdAt);
    }

    return new User(name, email, password, id, createdAt);
  }
}
