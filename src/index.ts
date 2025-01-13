import dotenv from 'dotenv';
import { start } from './infra/http/server';

dotenv.config();

start();