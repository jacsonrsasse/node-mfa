import { FastifyInstance } from 'fastify';
import { AuthControllerFacotry } from '../factories/auth-controller.factory';

export const authRoutes = (fastify: FastifyInstance) => {
  const signUpController = AuthControllerFacotry.createSignUp();

  fastify.post('/register', signUpController.handle.bind(signUpController));
};
