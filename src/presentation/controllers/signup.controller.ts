import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserDTO } from '@application/dtos/create-user.dto';
import { ICreateUserUseCase } from '@application/interfaces/use-cases/create-user-usecase.interface';
import { Validator } from '@infra/validators/validator.interface';
import { ValidationException } from '@shared/exceptions';
import { success, withError } from '@infra/http/fastify/response';

type CreteUserValidator = Validator<ValidationException, CreateUserDTO>;

export class SignUpController {
  constructor(
    private readonly createUserUseCase: ICreateUserUseCase,
    private readonly createUserValidator: CreteUserValidator,
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const validateResult = this.createUserValidator.validate(request.body);
    if (validateResult.isLeft()) {
      return withError(response, validateResult.value);
    }

    const createUser = validateResult.value;
    const createResult = await this.createUserUseCase.execute(createUser);
    if (createResult.isLeft()) {
      return withError(response, createResult.value);
    }

    return success(response, createResult.value, 201);
  }
}
