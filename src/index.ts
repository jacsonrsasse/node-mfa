import dotenv from 'dotenv';
import { startServer } from './infra';
import { DrizzleClientService } from './infra/db/drizzle-client.service';

dotenv.config();

DrizzleClientService.initDatabase();

startServer();
