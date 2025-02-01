import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserDTO } from '@application/dtos/create-user.dto';
import { ICreateUserUseCase } from '@application/interfaces/use-cases/create-user-usecase.interface';
import { Validator } from '@infra/validators/validator.interface';

export class SignUpController {
  constructor(
    private readonly createUserUseCase: ICreateUserUseCase,
    private readonly createUserValidator: Validator<Error, CreateUserDTO>,
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    const validateResult = this.createUserValidator.validate(request.body);
    if (validateResult.isLeft()) {
      return response.status(400).send(validateResult.value);
    }

    const createUser = validateResult.value;
    const createResult = await this.createUserUseCase.execute(createUser);
    if (createResult.isLeft()) {
      return response.status(400).send(createResult.value);
    }

    return response.status(201).send(createResult.value);
  }
}
