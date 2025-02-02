import { Exception } from '@shared/exceptions/exception';

export class UserNotFoundByCredentials extends Exception {
  constructor() {
    super('User not found with these credentials', 404);
  }
}
