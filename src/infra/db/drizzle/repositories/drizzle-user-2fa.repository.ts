import { User2fa } from '@domain/entities/user-2fa.entity';
import { IUser2faRepository } from '@domain/interfaces/repositories/user-2fa-repository.interface';
import { DrizzleClientService } from '../drizzle-client.service';
import { userSecondFactorTable } from '../schema';
import { User2faMapper } from '../mappers/user-2fa.mapper';
import { eq, and } from 'drizzle-orm';

export class User2faRepository implements IUser2faRepository {
  async create(entity: User2fa): Promise<boolean> {
    const result = await DrizzleClientService.getClient()
      .insert(userSecondFactorTable)
      .values(User2faMapper.toRepository(entity))
      .onConflictDoNothing()
      .returning({
        id: userSecondFactorTable.userId,
      });
    return !!result.length;
  }

  async delete(entity: User2fa): Promise<boolean> {
    const result = await DrizzleClientService.getClient()
      .delete(userSecondFactorTable)
      .where(eq(userSecondFactorTable.userId, entity.userId))
      .returning();
    return !!result.length;
  }

  async findByUserIdAndType(
    userId: number,
    type: User2fa['type'],
  ): Promise<User2fa | null> {
    const result = await DrizzleClientService.getClient()
      .select()
      .from(userSecondFactorTable)
      .where(
        and(
          eq(userSecondFactorTable.userId, userId),
          eq(userSecondFactorTable.type, type),
        ),
      );
    if (!result.length) return;

    return User2faMapper.fromRepository(result[0]);
  }
}
