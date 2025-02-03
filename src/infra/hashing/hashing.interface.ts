export interface IHashingService {
  encrypt(toEncrypt: string): string | Promise<string>;

  compare(value: string, toCompare: string): boolean | Promise<boolean>;
}
