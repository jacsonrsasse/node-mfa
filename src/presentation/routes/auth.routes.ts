import { FastifyInstance } from 'fastify';
import { AuthControllerFacotry } from '../factories/auth-controller.factory';

export const authRoutes = (fastify: FastifyInstance) => {
  const signUpController = AuthControllerFacotry.createSignUp();
  const loginController = AuthControllerFacotry.createLogin();

  fastify.post('/register', signUpController.handle.bind(signUpController));
  fastify.post('/login', loginController.handle.bind(loginController));
  fastify.post('/refresh', loginController.handle.bind(loginController));
};
