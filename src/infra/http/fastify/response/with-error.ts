import { IException } from '@shared/exceptions/exception';
import { FastifyReply } from 'fastify';

export function withError(response: FastifyReply, error: IException) {
  return response
    .status(error.statusCode)
    .send({ statusCode: error.statusCode, message: error.message });
}
