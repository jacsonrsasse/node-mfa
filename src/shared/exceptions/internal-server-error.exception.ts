import { Exception } from './exception';

export class InternalServerError extends Exception {
  constructor() {
    super('Internal Server Error', 500);
  }
}
