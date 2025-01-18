import { configDotenv } from 'dotenv';
import { startServer } from './infra';
import { DrizzleClientService } from './infra/db/drizzle-client.service';

configDotenv();

DrizzleClientService.initDatabase();

startServer();
