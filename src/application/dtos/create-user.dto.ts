import { UserData } from 'src/domain/entities/user.entity';

export type CreateUserDTO = Pick<UserData, 'name' | 'email' | 'password'>;
