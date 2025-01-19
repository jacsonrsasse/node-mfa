import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserDTO } from 'src/application/dtos/create-user.dto';
import { CreateUserUseCase } from 'src/application/interfaces/create-user-usecase.interface';
import { Validator } from 'src/domain/validators/validator.interface';

export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly createUserValidator: Validator<Error, CreateUserDTO>,
  ) {}

  register(request: FastifyRequest, response: FastifyReply) {
    const validateResult = this.createUserValidator.validate(request.body);
    if (validateResult.isLeft()) {
      response.status(400).send(validateResult.value.message);
    }

    response.send(validateResult.value);
  }
}
