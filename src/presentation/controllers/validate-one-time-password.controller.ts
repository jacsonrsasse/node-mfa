import { ValidateUserOneTimePasswordDto } from '@application/dtos/validate-user-one-time-password.dto';
import { IValidateOneTimePasswordUseCase } from '@application/interfaces/use-cases/validate-one-time-password-usecase.interface';
import { success, withError } from '@infra/http/fastify/response';
import { Validator } from '@infra/validators/validator.interface';
import { ValidationException } from '@shared/exceptions';
import { FastifyReply, FastifyRequest } from 'fastify';

export class ValidateOneTimePasswordController {
  constructor(
    private readonly validateOneTimePasswordUseCase: IValidateOneTimePasswordUseCase,
    private readonly validateOneTimePasswordValidator: Validator<
      ValidationException,
      ValidateUserOneTimePasswordDto
    >,
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const validateResult = this.validateOneTimePasswordValidator.validate(
      request.body,
    );
    if (validateResult.isLeft()) {
      return withError(response, validateResult.value);
    }

    try {
      const validateDto = validateResult.value;
      const result =
        await this.validateOneTimePasswordUseCase.execute(validateDto);
      return success(response, result);
    } catch (error) {
      return withError(response, error);
    }
  }
}
