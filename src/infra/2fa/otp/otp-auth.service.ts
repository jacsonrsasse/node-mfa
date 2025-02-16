import { env } from '@infra/env';
import {
  GenerateOtpData,
  IOtpService,
  ValidateOtpData,
} from './otp-service.interface';
import { Secret, TOTP } from 'otpauth';
import { toString as qrcodeToString } from 'qrcode';
import { randomBytes } from 'crypto';

export class OtpAuthService implements IOtpService {
  generateSecret(): string {
    return Secret.fromHex(randomBytes(42).toString('hex')).base32;
  }

  async generateOtpLink(data: GenerateOtpData): Promise<string> {
    const totp = this.createTotp(data);
    const uri = totp.toString();

    return new Promise((resolve, reject) => {
      qrcodeToString(uri, (error, value) => {
        if (error !== null) return reject(error);

        return resolve(value);
      });
    });
  }

  validate(data: ValidateOtpData): boolean {
    const { code, secret, subject } = data;
    const totp = this.createTotp({
      secret,
      subject,
    });
    return !!totp.validate({
      token: code.toString(),
      window: 1,
    });
  }

  private createTotp(data: GenerateOtpData) {
    return new TOTP({
      algorithm: 'SHA1',
      label: data.subject,
      issuer: env.ISSUER,
      digits: 6,
      period: 30,
      secret: data.secret,
    });
  }
}
