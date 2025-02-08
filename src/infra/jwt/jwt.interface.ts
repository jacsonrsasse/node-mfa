export type JwtInput = {
  subject: string;
  audience?: string;
  payload?: object;
};

export type JwtOutput = {
  accessToken: string;
  refreshToken: string;
};

export interface IJwtService {
  sign(options?: JwtInput): JwtOutput | Promise<JwtOutput>;

  verify(jwt: string): boolean;
}
