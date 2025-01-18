import { UserData } from '../interfaces/user-data.interface';

export class User {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private id?: number,
    private createdAt?: Date,
  ) {}

  static create(userData: UserData): User {
    const { name, email, password, id, createdAt } = userData;
    return new User(name, email, password, id, createdAt);
  }
}
