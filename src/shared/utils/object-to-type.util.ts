/* eslint-disable @typescript-eslint/no-explicit-any */
type Writable<T> = {
  -readonly [K in keyof T]: T[K];
};

export type ObjetoToType<T> = Writable<
  Pick<
    T,
    {
      [K in keyof T]: T[K] extends (...args: any) => any ? never : K;
    }[keyof T]
  >
>;
