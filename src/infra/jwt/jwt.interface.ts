export type JwtOptions = {
  expiresIn?: '1h' | '1d' | '7d';
  subject?: string;
  audience?: string;
};

export interface IJwtService {
  sign(payload: any, options?: JwtOptions): string | Promise<string>;
}
