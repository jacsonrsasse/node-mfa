import { ValidationException } from '@shared/exceptions';
import { Either, left, right } from '@shared/monad/either';
import { Validator } from '../validator.interface';
import { ZodSchema } from 'zod';

export class ZodValidator<T> implements Validator<ValidationException, T> {
  constructor(private readonly schema: ZodSchema) {}

  validate(data: unknown): Either<ValidationException, T> {
    const { data: parsedData, error } = this.schema.safeParse(data);

    if (error && error.errors.length) {
      return left(new ValidationException(error.message));
    }

    return right(parsedData);
  }
}
