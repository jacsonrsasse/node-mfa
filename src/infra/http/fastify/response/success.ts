import { FastifyReply } from 'fastify';

export function success<T>(response: FastifyReply, data: T, statusCode = 200) {
  return response.status(statusCode).send(data);
}
