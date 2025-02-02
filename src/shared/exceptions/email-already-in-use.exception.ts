import { Exception } from '@shared/exceptions/exception';

export class EmailAlreadyInUseException extends Exception {
  constructor() {
    super('Email address already in use', 400);
  }
}
