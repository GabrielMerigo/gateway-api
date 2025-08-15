import { Injectable } from '@nestjs/common';
import { UserRepository } from '@core/repositories/user';
import { User } from '@core/entities/user';
import { ErrorMessages, ExceptionCode } from '@core/adapters/exceptions';
import { ExceptionsAdapter } from '@core/adapters';

@Injectable()
export class UpdateBalanceUseCase {
  constructor(
    private readonly accountRepository: UserRepository,
    private readonly exception: ExceptionsAdapter,
  ) {}

  async execute(user: Pick<User, 'id' | 'balance'>): Promise<void> {
    if (user.balance < 0) {
      return this.exception.badRequest({
        message: ErrorMessages[ExceptionCode.INVALID_BALANCE],
        code: ExceptionCode.INVALID_BALANCE,
      });
    }

    await this.accountRepository.updateBalance(user);
  }
}
