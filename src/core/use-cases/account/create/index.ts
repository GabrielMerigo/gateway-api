import { Injectable } from '@nestjs/common';
import { AccountRepository } from '@core/repositories/account-repository';
import { Account } from '@core/entities/account-entity';
import { ErrorMessages, ExceptionCode } from '@core/adapters/exceptions';
import { ExceptionsAdapter } from '@core/adapters';

interface CreateAccountParams {
  name: string;
  email: string;
  apiKey: string;
  balance: number;
}

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly exception: ExceptionsAdapter,
  ) {}

  async execute(data: CreateAccountParams): Promise<Account | void> {
    const account = await this.accountRepository.findByApiKey(data.apiKey);

    if (account) {
      return this.exception.conflict({
        message: ErrorMessages[ExceptionCode.DUPLICATED_API_KEY],
        code: ExceptionCode.DUPLICATED_API_KEY,
      });
    }

    return await this.accountRepository.create({
      name: data.name,
      email: data.email,
      apiKey: data.apiKey,
      balance: data.balance,
    });
  }
}
