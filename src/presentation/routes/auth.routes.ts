import { FastifyInstance } from 'fastify';
import { AuthControllerFacotry } from '../factories/auth-controller.factory';

export const authRoutes = (fastify: FastifyInstance) => {
  const signUpController = AuthControllerFacotry.createSignUp();
  const loginController = AuthControllerFacotry.createLogin();
  const refreshController = AuthControllerFacotry.createRefreshToken();
  const oneTimePasswordController =
    AuthControllerFacotry.createOneTimePassword();
  const validateOneTimePasswordController =
    AuthControllerFacotry.validateOneTimePassword();

  fastify.post('/register', signUpController.handle.bind(signUpController));
  fastify.post('/login', loginController.handle.bind(loginController));
  fastify.post('/refresh', refreshController.handle.bind(refreshController));

  fastify.get(
    '/2fa/otp/:userId',
    oneTimePasswordController.handle.bind(oneTimePasswordController),
  );
  fastify.patch(
    '/2fa/otp/validate',
    validateOneTimePasswordController.handle.bind(
      validateOneTimePasswordController,
    ),
  );
};
