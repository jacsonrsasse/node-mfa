import { env } from '@infra/env';
import { IEncryptgService } from './encrypt.interface';
import {
  createHmac,
  scryptSync,
  createCipheriv,
  randomBytes,
  createDecipheriv,
} from 'crypto';

export class NodeEncryptService implements IEncryptgService {
  private hashAlgorithm = 'sha256';
  private secureAlgorithm = 'aes-192-cbc';

  encrypt(toEncrypt: string): Promise<string> {
    return new Promise((resolve) => {
      try {
        const salt = randomBytes(16).toString('hex');
        const key = scryptSync(env.ENCRYPT_SECRET, salt, 24);
        const iv = randomBytes(16);

        const cipher = createCipheriv(this.secureAlgorithm, key, iv);
        let encrypted = '';

        cipher.on('readable', () => {
          let chunk;
          while (null !== (chunk = cipher.read())) {
            encrypted = chunk.toString('hex');
          }
        });
        cipher.on('end', () =>
          resolve(`${iv.toString('hex')}:${encrypted}:${salt}`),
        );

        cipher.write(toEncrypt);
        cipher.end();
      } catch {
        resolve(null);
      }
    });
  }

  decrypt(toDecrypt: string): Promise<string> {
    return new Promise((resolve) => {
      try {
        const [iv, encrypted, salt] = toDecrypt.split(':');
        const ivBuffer = Buffer.from(iv, 'hex');
        const key = scryptSync(env.ENCRYPT_SECRET, salt, 24);

        const decipher = createDecipheriv(this.secureAlgorithm, key, ivBuffer);
        let decrypted = '';

        decipher.on('readable', () => {
          let chunk;
          while (null !== (chunk = decipher.read())) {
            decrypted = chunk.toString('utf8');
          }
        });
        decipher.on('end', () => resolve(decrypted));

        decipher.write(encrypted, 'hex');
        decipher.end();
      } catch {
        resolve(null);
      }
    });
  }

  hash(toHash: string): string {
    return createHmac(this.hashAlgorithm, env.HASHING_SECRET)
      .update(toHash)
      .digest('hex');
  }

  compare(value: string, toCompare: string): boolean {
    return this.hash(value) === toCompare;
  }
}
