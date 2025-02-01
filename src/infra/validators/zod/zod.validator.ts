import { Either, left, right } from '@shared/monad/either';
import { Validator } from 'src/infra/validators/validator.interface';
import { ZodSchema } from 'zod';

export class ZodValidator<T> implements Validator<Error, T> {
  constructor(private readonly schema: ZodSchema) {}

  validate(data: unknown): Either<Error, T> {
    const { data: parsedData, error } = this.schema.safeParse(data);

    if (error && error.errors.length) {
      return left(error);
    }

    return right(parsedData);
  }
}
