import { DomainException } from './domain.exception';

export class UserCreationFailed extends DomainException('CreateUserFailed') {
  constructor() {
    super('Failed to create user');
  }
}
