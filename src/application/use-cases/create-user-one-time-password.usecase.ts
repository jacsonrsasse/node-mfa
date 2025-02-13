import { ICreateUserOneTimePasswordUseCase } from '@application/interfaces/use-cases/create-user-one-time-password-usecase.interface';
import { User2fa } from '@domain/entities/user-2fa.entity';
import { IUser2faRepository } from '@domain/interfaces/repositories/user-2fa-repository.interface';
import { IOtpService } from '@infra/2fa/otp/otp-service.interface';

export class CreateUserOneTimePasswordUseCase
  implements ICreateUserOneTimePasswordUseCase
{
  constructor(
    private readonly otpService: IOtpService,
    private readonly user2faRepository: IUser2faRepository,
  ) {}

  async execute(userId: number): Promise<string> {
    const userHasOneTime = await this.user2faRepository.findByUserIdAndType(
      userId,
      'one_time_password',
    );
    if (userHasOneTime) {
      await this.user2faRepository.delete(userHasOneTime);
    }

    const otpHash = this.otpService.generateSecret();
    const user2fa = User2fa.create({
      userId,
      otpHash,
      type: 'one_time_password',
    });

    await this.user2faRepository.create(user2fa);

    return this.otpService.generateOtpLink({
      secret: otpHash,
      subject: userId.toString(),
    });
  }
}
