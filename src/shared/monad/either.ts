/* eslint-disable @typescript-eslint/no-unused-vars */

export class Left<L, R> {
  constructor(readonly value: L) {}

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }

  map<U>(_: (value: R) => U): Either<L, U> {
    return this as unknown as Either<L, U>;
  }

  mapLeft<U>(fn: (value: L) => U): Either<U, R> {
    return left(fn(this.value));
  }
}

export class Right<L, R> {
  constructor(readonly value: R) {}

  isLeft(): this is Left<L, R> {
    return false;
  }

  isRight(): this is Right<L, R> {
    return true;
  }

  map<U>(fn: (value: R) => U): Either<L, U> {
    return right(fn(this.value));
  }

  mapLeft<U>(_: (value: L) => U): Either<U, R> {
    return this as unknown as Either<U, R>;
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

export const left = <L, R>(l: L): Either<L, R> => new Left<L, R>(l);
export const right = <L, R>(r: R): Either<L, R> => new Right<L, R>(r);
