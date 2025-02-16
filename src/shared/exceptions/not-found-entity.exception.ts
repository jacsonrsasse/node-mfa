import { Exception } from './exception';

export class NotFoundEntityException extends Exception {
  constructor(entity: string) {
    super(`Entity ${entity} not found`, 404);
  }
}
