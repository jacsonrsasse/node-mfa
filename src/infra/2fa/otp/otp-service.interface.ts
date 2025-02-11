// One time password

export type GenerateOtpData = {
  subject: string;
  secret: string;
};

export interface IOtpService {
  generateSecret(hexValue: string): string;

  generateOtpLink(data: GenerateOtpData): Promise<string> | string;
}
