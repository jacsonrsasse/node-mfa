export type JwtOptions = {
  expiresIn?: '1h' | '1d';
  subject?: string;
  audience?: string;
  type: 'access' | 'refresh';
};

export type IJwtSignProps = {
  payload?: any;
  options?: JwtOptions;
};

export interface IJwtService {
  sign(props: IJwtSignProps): string | Promise<string>;
}
