import { IJwtService, JwtOptions } from './jwt.interface';
import { sign as jwtSign } from 'jsonwebtoken';

export class JwtService implements IJwtService {
  sign(payload: any, options?: JwtOptions): string | Promise<string> {
    return jwtSign(payload, 'teste', {
      algorithm: 'HS256',
      expiresIn: options?.expiresIn || '1h',
      audience: options?.audience || '',
      subject: options?.subject || '',
      issuer: 'node-mfa-api',
    });
  }
}
