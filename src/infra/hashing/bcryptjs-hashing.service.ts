import { IHashingService } from './hashing.interface';
import { hash, compare } from 'bcryptjs';

export class BcryptJsHashingService implements IHashingService {
  async encrypt(toEncrypt: string): Promise<string> {
    return hash(toEncrypt, 9);
  }

  compare(value: string, toCompare: string): Promise<boolean> {
    return compare(value, toCompare);
  }
}
