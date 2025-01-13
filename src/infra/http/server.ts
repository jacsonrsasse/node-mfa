import dotenv from 'dotenv';

dotenv.config();

import Fastify from 'fastify';
import { authRoutes } from './router';


const server = Fastify();

server.get('/', async (request, reply) => {
  return { message: 'Hello, Fastify with TypeScript!' };
});

server.register(authRoutes, { prefix: '/auth'})

const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await server.listen({ port: Number(port), host: '0.0.0.0' });
    console.log(`Server running on http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();