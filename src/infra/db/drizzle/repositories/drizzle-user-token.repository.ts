import { UserToken } from '@domain/entities/user-token.entity';
import { IUserTokenRepository } from '@domain/interfaces/repositories/user-token.repository';
import { DrizzleClientService } from '../drizzle-client.service';
import { userTokenTable } from '../schema';
import { UserTokenMapper } from '../mappers/user-token.mapper';

export class DrizzleUserTokenRepository implements IUserTokenRepository {
  async create(userToken: UserToken): Promise<boolean> {
    const result = await DrizzleClientService.getClient()
      .insert(userTokenTable)
      .values(UserTokenMapper.toRepository(userToken))
      .onConflictDoNothing()
      .returning({
        id: userTokenTable.userId,
      });
    return !!result.length;
  }

  findByRefresh(refreshToken: string): Promise<UserToken | null> {
    throw new Error('Method not implemented.');
  }
}
