import {
  BetterSQLite3Database,
  drizzle,
} from 'drizzle-orm/better-sqlite3/driver';

export class DrizzleClientService {
  static dbClient: BetterSQLite3Database;

  static initDatabase() {
    this.dbClient = drizzle(process.env.DB_FILE_NAME);
  }

  static getClient() {
    if (!this.dbClient) throw new Error('DB Client not initialized!');

    return this.dbClient;
  }
}
