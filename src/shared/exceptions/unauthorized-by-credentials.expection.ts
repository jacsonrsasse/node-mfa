import { Exception } from '@shared/exceptions/exception';

export class UnauthorizedByCredentials extends Exception {
  constructor() {
    super('Incorrect email/password combination', 401);
  }
}
