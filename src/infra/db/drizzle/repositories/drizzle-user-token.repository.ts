import { UserToken } from '@domain/entities/user-token.entity';
import { IUserTokenRepository } from '@domain/interfaces/repositories/user-token.repository';
import { DrizzleClientService } from '../drizzle-client.service';
import { userTokenTable } from '../schema';
import { UserTokenMapper } from '../mappers/user-token.mapper';
import { eq } from 'drizzle-orm';

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

  async delete(userToken: UserToken): Promise<boolean> {
    const result = await DrizzleClientService.getClient()
      .delete(userTokenTable)
      .where(eq(userTokenTable.userId, userToken.userId))
      .returning();
    return !!result.length;
  }

  async findByRefresh(refreshToken: string): Promise<UserToken | null> {
    const result = await DrizzleClientService.getClient()
      .select()
      .from(userTokenTable)
      .where(eq(userTokenTable.refreshToken, refreshToken));

    if (!result.length) return;

    return UserTokenMapper.fromRepository(result[0]);
  }
}
