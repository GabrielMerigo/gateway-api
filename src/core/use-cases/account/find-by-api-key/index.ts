import { Injectable } from '@nestjs/common';
import { AccountRepository } from '@core/repositories/account-repository';
import { Account } from '@core/entities/account-entity';
import { ErrorMessages, ExceptionCode } from '@core/adapters/exceptions';
import { ExceptionsAdapter } from '@core/adapters';

@Injectable()
export class FindByApiKeyAccountUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly exception: ExceptionsAdapter,
  ) {}

  async execute(apiKey: string): Promise<Account | null> {
    const account = await this.accountRepository.findByApiKey(apiKey);

    if (!account) {
      this.exception.notFound({
        message: ErrorMessages[ExceptionCode.NOT_FOUND],
        code: ExceptionCode.NOT_FOUND,
      });
    }

    return account;
  }
}
