import { env } from '@infra/env';
import { IJwtService, JwtInput, JwtOutput } from './jwt.interface';
import {
  sign as jwtSign,
  verify as jwtVerify,
  SignOptions,
} from 'jsonwebtoken';

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
        expiresIn: '30 seconds',
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

  verify(jwt: string): boolean {
    try {
      const result = jwtVerify(jwt, env.JWT_SECRET);
      return !!result;
    } catch {
      return false;
    }
  }
}
