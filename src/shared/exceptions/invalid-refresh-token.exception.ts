import { Exception } from './exception';

export class InvalidRefreshTokenException extends Exception {
  constructor() {
    super('Invalid refresh token', 401);
  }
}
