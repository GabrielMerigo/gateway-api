import { Injectable } from '@nestjs/common';
import { AccountRepository } from '@core/repositories/account';
import { Account } from '@core/entities/account';
import { ErrorMessages, ExceptionCode } from '@core/adapters/exceptions';
import { ExceptionsAdapter } from '@core/adapters';

@Injectable()
export class UpdateBalanceUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly exception: ExceptionsAdapter,
  ) {}

  async execute(account: Pick<Account, 'id' | 'balance'>): Promise<void> {
    if (account.balance < 0) {
      return this.exception.badRequest({
        message: ErrorMessages[ExceptionCode.INVALID_BALANCE],
        code: ExceptionCode.INVALID_BALANCE,
      });
    }

    await this.accountRepository.updateBalance(account);
  }
}
