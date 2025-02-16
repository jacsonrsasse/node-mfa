import { ValidateUserOneTimePasswordDto } from '@application/dtos/validate-user-one-time-password.dto';

export interface IValidateOneTimePasswordUseCase {
  execute(validateData: ValidateUserOneTimePasswordDto): Promise<boolean>;
}
