import { Exception } from '@shared/exception/exception';

export class UserCreationException extends Exception('CreateUserException') {
  constructor() {
    super('Failed to create user', 500);
  }
}
