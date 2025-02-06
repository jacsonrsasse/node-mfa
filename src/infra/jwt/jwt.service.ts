import { env } from '@infra/env';
import { IJwtService, JwtInput, JwtOutput } from './jwt.interface';
import { sign as jwtSign, SignOptions } from 'jsonwebtoken';

export class JwtService implements IJwtService {
  sign({ payload, audience, subject }: JwtInput): JwtOutput {
    const options = {
      algorithm: 'HS256',
      audience: audience || '',
      subject: subject,
      issuer: 'node-mfa-api',
    } as SignOptions;

    const accessToken = jwtSign(
      {
        type: 'access',
        ...(payload || {}),
      },
      env.JWT_SECRET,
      {
        expiresIn: 60 * 5,
        ...options,
      },
    );
    const refreshToken = jwtSign(
      {
        type: 'refresh',
        ...(payload || {}),
      },
      env.JWT_SECRET,
      {
        expiresIn: '1h',
        ...options,
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
