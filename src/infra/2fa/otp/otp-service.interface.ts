// One time password

export type GenerateOtpData = {
  subject: string;
  secret: string;
};

export interface IOtpService {
  generateSecret(): string;

  generateOtpLink(data: GenerateOtpData): Promise<string> | string;
}
