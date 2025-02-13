import { User2fa } from '@domain/entities/user-2fa.entity';
import { IBaseRepository } from './base-repository';

export interface IUser2faRepository extends IBaseRepository<User2fa> {
  findByUserIdAndType(
    userId: number,
    type: User2fa['type'],
  ): Promise<User2fa | null>;
}
