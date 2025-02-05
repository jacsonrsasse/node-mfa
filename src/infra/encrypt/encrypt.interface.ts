export interface IEncryptgService {
  encrypt(toEncrypt: string): string | Promise<string>;

  decrypt(toDecrypt: string): string | Promise<string>;

  hash(toHash: string): string | Promise<string>;

  compare(value: string, toCompare: string): boolean | Promise<boolean>;
}
