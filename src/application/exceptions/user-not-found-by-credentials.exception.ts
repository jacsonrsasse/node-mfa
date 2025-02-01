import { Exception } from '@shared/exception/exception';

export class UserNotFoundByCredentials extends Exception(
  'UserNotFoundByCredentials',
) {
  constructor() {
    super('User not found with these credentials', 404);
  }
}
