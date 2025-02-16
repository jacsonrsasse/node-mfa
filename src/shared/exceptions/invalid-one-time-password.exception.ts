import { Exception } from './exception';

export class InvalidaOneTimePasswordException extends Exception {
  constructor() {
    super('Invalid code', 401);
  }
}
