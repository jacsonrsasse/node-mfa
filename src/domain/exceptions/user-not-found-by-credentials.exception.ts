import { DomainException } from './domain.exception';

export class UserNotFoundByCredentials extends DomainException(
  'UserNotFoundByCredentials',
) {
  constructor() {
    super('User not found with these credentials');
  }
}
