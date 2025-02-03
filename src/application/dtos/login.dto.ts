import { UserData } from '@domain/entities/user.entity';

export type LoginDTO = Pick<UserData, 'email' | 'password'>;
