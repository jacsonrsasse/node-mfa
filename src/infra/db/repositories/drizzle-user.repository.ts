import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { DrizzleClientService } from '../drizzle-client.service';
import { userTable } from '../schema';
import { eq } from 'drizzle-orm';
import { UserMapper } from 'src/domain/mappers/user.mapper';

export class DrizzleUserRepository implements UserRepository {
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
