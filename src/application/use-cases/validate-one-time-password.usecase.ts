import { ValidateUserOneTimePasswordDto } from '@application/dtos/validate-user-one-time-password.dto';
import { IValidateOneTimePasswordUseCase } from '@application/interfaces/use-cases/validate-one-time-password-usecase.interface';
import { User2fa } from '@domain/entities/user-2fa.entity';
import { IUser2faRepository } from '@domain/interfaces/repositories/user-2fa-repository.interface';
import { IOtpService } from '@infra/2fa/otp/otp-service.interface';
import { InternalServerError } from '@shared/exceptions/internal-server-error.exception';
import { InvalidaOneTimePasswordException } from '@shared/exceptions/invalid-one-time-password.exception';
import { NotFoundEntityException } from '@shared/exceptions/not-found-entity.exception';
import { dateToSqliteString } from '@shared/utils/date-to-sqlite-string.util';

export class ValidateOneTimePasswordUseCase
  implements IValidateOneTimePasswordUseCase
{
  constructor(
    private readonly user2faRepository: IUser2faRepository,
    private readonly otpAuthService: IOtpService,
  ) {}

  async execute(
    validateData: ValidateUserOneTimePasswordDto,
  ): Promise<boolean> {
    const { code, userId } = validateData;
    const user2fa = await this.user2faRepository.findByUserIdAndType(
      userId,
      'one_time_password',
    );
    if (!user2fa) {
      throw new NotFoundEntityException('Second Factor Authenticator');
    }

    const isValid = await this.otpAuthService.validate({
      code,
      secret: user2fa.otpHash,
      subject: userId.toString(),
    });
    if (!isValid) {
      throw new InvalidaOneTimePasswordException();
    }

    const updated = await this.user2faRepository.update(
      User2fa.create({
        ...user2fa,
        createdAt: dateToSqliteString(user2fa.createdAt),
        otpValidatedAt: dateToSqliteString(new Date()),
      }),
    );
    if (!updated) {
      throw new InternalServerError();
    }

    return true;
  }
}
