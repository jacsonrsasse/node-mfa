import { User, UserData } from '../entities/user.entity';

export class UserMapper {
  static fromRepository(userData: UserData): User {
    return User.create(userData);
  }

  static toRepository({ name, email, password }: User) {
    return {
      name,
      email,
      password,
    };
  }
}
