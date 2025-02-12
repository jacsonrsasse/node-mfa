import { IRefreshTokenUseCase } from '@application/interfaces/use-cases/refresh-token-usecase.interface';
import { success, withError } from '@infra/http/fastify/response';
import { Validator } from '@infra/validators/validator.interface';
import { ValidationException } from '@shared/exceptions';
import { FastifyReply, FastifyRequest } from 'fastify';

type RefreshTokenValidator = Validator<
  ValidationException,
  { refreshToken: string }
>;

export class RefreshController {
  constructor(
    private readonly refreshTokenUseCase: IRefreshTokenUseCase,
    private readonly refreshTokenValidator: RefreshTokenValidator,
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const validateResult = this.refreshTokenValidator.validate(request.body);
    if (validateResult.isLeft()) {
      return withError(response, validateResult.value);
    }

    const { refreshToken } = validateResult.value;
    const createResult = await this.refreshTokenUseCase.execute(refreshToken);
    if (createResult.isLeft()) {
      return withError(response, createResult.value);
    }

    return success(response, createResult.value, 201);
  }
}
