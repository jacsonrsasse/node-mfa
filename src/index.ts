import { configDotenv } from 'dotenv';
import { startServer } from './infra/http/fastify/server';
import { DrizzleClientService } from './infra/db/drizzle/drizzle-client.service';

configDotenv();

DrizzleClientService.initDatabase();

startServer();
