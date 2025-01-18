import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const authRoutes = (fastify: FastifyInstance) => {
  fastify.get('/', (request: FastifyRequest, reply: FastifyReply) =>
    reply.send({
      message: 'Get in Auth',
    }),
  );
};

export default authRoutes;
