// One time password

export type GenerateOtpData = {
  subject: string;
  secret: string;
};

export type ValidateOtpData = GenerateOtpData & {
  code: number;
};

export interface IOtpService {
  generateSecret(): string;

  generateOtpLink(data: GenerateOtpData): Promise<string> | string;

  validate(data: ValidateOtpData): Promise<boolean> | boolean;
}
