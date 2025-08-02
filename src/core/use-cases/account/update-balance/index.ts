import { Injectable } from '@nestjs/common';
import { AccountRepository } from '@core/repositories/account-repository';
import { Account } from '@core/entities/account-entity';
import { ErrorMessages, ExceptionCode } from '@core/adapters/exceptions';
import { ExceptionsAdapter } from '@core/adapters';

@Injectable()
export class UpdateBalanceUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly exception: ExceptionsAdapter,
  ) {}

  async execute(account: Pick<Account, 'id' | 'balance'>): Promise<void> {
    const accountExists = await this.accountRepository.findById(account.id);

    if (!accountExists) {
      this.exception.notFound({
        message: ErrorMessages[ExceptionCode.NOT_FOUND],
        code: ExceptionCode.NOT_FOUND,
      });
    }

    if (account.balance < 0) {
      this.exception.badRequest({
        message: ErrorMessages[ExceptionCode.INVALID_BALANCE],
        code: ExceptionCode.INVALID_BALANCE,
      });
    }

    await this.accountRepository.updateBalance(account);
  }
}
