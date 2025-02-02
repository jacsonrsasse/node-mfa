import { Exception } from '@shared/exceptions/exception';

export class UserCreationException extends Exception {
  constructor() {
    super('Failed to create user', 500);
  }
}
