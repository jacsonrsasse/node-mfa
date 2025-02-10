import { User } from 'src/domain/entities/user.entity';
import { IUserRepository } from '@domain/interfaces/repositories/user.repository';
import { DrizzleClientService } from '../drizzle-client.service';
import { userTable } from '../schema';
import { eq } from 'drizzle-orm';
import { UserMapper } from '@infra/db/drizzle/mappers/user.mapper';

export class DrizzleUserRepository implements IUserRepository {
  async create(user: User): Promise<boolean> {
    const result = await DrizzleClientService.getClient()
      .insert(userTable)
      .values(UserMapper.toRepository(user))
      .onConflictDoNothing()
      .returning({
        id: userTable.id,
      });
    return !!result.length;
  }

  async delete(user: User): Promise<boolean> {
    const result = await DrizzleClientService.getClient()
      .delete(userTable)
      .where(eq(userTable.id, user.id))
      .returning();
    return !!result.length;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userFromDb = await DrizzleClientService.getClient()
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    const user = userFromDb.shift();
    if (!user) {
      return null;
    }

    return UserMapper.fromRepository(user);
  }
}
