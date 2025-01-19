import { FastifyInstance } from 'fastify';
import { makeAuthControllerFactory } from '../factories/make-auth-controller.factory';

export const authRoutes = (fastify: FastifyInstance) => {
  const authController = makeAuthControllerFactory();

  fastify.post('/register', authController.register.bind(authController));
};
