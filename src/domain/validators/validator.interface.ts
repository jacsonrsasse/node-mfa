import { Either } from '@shared/monad/either';

export interface Validator<L, R> {
  validate(data: unknown): Either<L, R>;
}
