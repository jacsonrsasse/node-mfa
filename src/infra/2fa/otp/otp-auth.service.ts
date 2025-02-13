import { env } from '@infra/env';
import { GenerateOtpData, IOtpService } from './otp-service.interface';
import { Secret, TOTP } from 'otpauth';
import { toString as qrcodeToString } from 'qrcode';
import { randomBytes } from 'crypto';

export class OtpAuthService implements IOtpService {
  generateSecret(): string {
    return Secret.fromHex(randomBytes(42).toString('hex')).base32;
  }

  async generateOtpLink(data: GenerateOtpData): Promise<string> {
    const totp = new TOTP({
      algorithm: 'SHA1',
      label: data.subject,
      issuer: env.ISSUER,
      digits: 6,
      period: 30,
      secret: data.secret,
    });
    const uri = totp.toString();

    return new Promise((resolve, reject) => {
      qrcodeToString(uri, (error, value) => {
        if (error !== null) return reject(error);

        return resolve(value);
      });
    });
  }
}
