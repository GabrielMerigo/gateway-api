import { Injectable } from '@nestjs/common';
import { AccountRepository } from '@core/repositories/account';
import { Account } from '@core/entities/account';
import { ErrorMessages, ExceptionCode } from '@core/adapters/exceptions';
import { ExceptionsAdapter } from '@core/adapters';

@Injectable()
export class FindByApiKeyAccountUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly exception: ExceptionsAdapter,
  ) {}

  async execute(apiKey: string): Promise<Account | void> {
    if (!apiKey) {
      return this.exception.badRequest({
        message: ErrorMessages[ExceptionCode.NEED_TO_PASS_API_KEY],
        code: ExceptionCode.NEED_TO_PASS_API_KEY,
      });
    }

    const account = await this.accountRepository.findByApiKey(apiKey);

    if (!account) {
      return this.exception.notFound({
        message: ErrorMessages[ExceptionCode.NOT_FOUND],
        code: ExceptionCode.NOT_FOUND,
      });
    }

    return account;
  }
}
