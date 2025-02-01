import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserDTO } from 'src/application/dtos/create-user.dto';
import { CreateUserUseCase } from 'src/application/interfaces/use-cases/create-user-usecase.interface';
import { Validator } from 'src/infra/validators/validator.interface';

export class SignUpController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
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
