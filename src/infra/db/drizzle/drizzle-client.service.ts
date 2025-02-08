import { env } from '@infra/env';
import Database from 'better-sqlite3';
import { ExtractTablesWithRelations } from 'drizzle-orm';
import {
  BetterSQLite3Database,
  drizzle,
} from 'drizzle-orm/better-sqlite3/driver';
import { SQLiteTransaction } from 'drizzle-orm/sqlite-core';
import * as schema from './schema';

export class DrizzleClientService {
  static dbClient: BetterSQLite3Database<typeof schema>;
  static transaction;

  static initDatabase() {
    this.dbClient = drizzle(env.DB_FILE_NAME, { schema });
  }

  static getClient() {
    if (!this.dbClient) throw new Error('DB Client not initialized!');

    return this.dbClient;
  }

  static runTransaction(
    fn: (
      tx: SQLiteTransaction<
        'sync',
        Database.RunResult,
        Record<string, never>,
        ExtractTablesWithRelations<Record<string, never>>
      >,
    ) => Promise<void>,
  ) {
    return this.dbClient.transaction(fn);
  }
}
