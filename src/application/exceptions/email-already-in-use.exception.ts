import { Exception } from '@shared/exception/exception';

export class EmailAlreadyInUseException extends Exception(
  'EmailAlreadyInUseException',
) {
  constructor() {
    super('Email address already in use', 400);
  }
}
