import { IJwtService, IJwtSignProps } from './jwt.interface';
import { sign as jwtSign } from 'jsonwebtoken';

export class JwtService implements IJwtService {
  sign({ payload, options }: IJwtSignProps): string | Promise<string> {
    return jwtSign(payload || {}, 'teste', {
      algorithm: 'HS256',
      expiresIn: options?.expiresIn || '1h',
      audience: options?.audience || '',
      subject: options?.subject || '',
      issuer: 'node-mfa-api',
    });
  }
}
