import { LoginDTO } from '@application/dtos/login.dto';
import { ILoginUseCase } from '@application/interfaces/use-cases/login-usecase.interface';
import { success, withError } from '@infra/http/fastify/response';
import { Validator } from '@infra/validators/validator.interface';
import { ValidationException } from '@shared/exceptions';
import { FastifyReply, FastifyRequest } from 'fastify';

export class LoginController {
  constructor(
    private readonly loginUseCase: ILoginUseCase,
    private readonly loginValidator: Validator<ValidationException, LoginDTO>,
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const validateResult = this.loginValidator.validate(request.body);
    if (validateResult.isLeft()) {
      return withError(response, validateResult.value);
    }

    const loginDto = validateResult.value;
    const result = await this.loginUseCase.execute(loginDto);
    if (result.isLeft()) {
      return withError(response, result.value);
    }
    return success(response, result.value);
  }
}
