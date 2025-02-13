import { ICreateUserOneTimePasswordUseCase } from '@application/interfaces/use-cases/create-user-one-time-password-usecase.interface';
import { success, withError } from '@infra/http/fastify/response';
import { Validator } from '@infra/validators/validator.interface';
import { ValidationException } from '@shared/exceptions';
import { FastifyReply, FastifyRequest } from 'fastify';

type OneTimePasswordValidator = Validator<
  ValidationException,
  { userId: number }
>;

export class OneTimePasswordController {
  constructor(
    private readonly createOneTimePasswordUseCase: ICreateUserOneTimePasswordUseCase,
    private readonly createOneTimePasswordValidator: OneTimePasswordValidator,
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const validateResult = this.createOneTimePasswordValidator.validate(
      request.params,
    );
    if (validateResult.isLeft()) {
      return withError(response, validateResult.value);
    }

    try {
      const { userId } = validateResult.value;
      const result = await this.createOneTimePasswordUseCase.execute(userId);
      return success(response, result);
    } catch (error) {
      console.log('error', error);
      return withError(response, error);
    }
  }
}
