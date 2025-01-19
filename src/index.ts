import { configDotenv } from 'dotenv';
import { startServer } from './infra/http/server';
import { DrizzleClientService } from './infra/db/drizzle-client.service';

configDotenv();

DrizzleClientService.initDatabase();

startServer();
