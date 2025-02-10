import { FastifyInstance } from 'fastify';
import { AuthControllerFacotry } from '../factories/auth-controller.factory';

export const authRoutes = (fastify: FastifyInstance) => {
  const signUpController = AuthControllerFacotry.createSignUp();
  const loginController = AuthControllerFacotry.createLogin();
  const refreshController = AuthControllerFacotry.createRefreshToken();

  fastify.post('/register', signUpController.handle.bind(signUpController));
  fastify.post('/login', loginController.handle.bind(loginController));
  fastify.post('/refresh', refreshController.handle.bind(refreshController));
};
