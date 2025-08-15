import { Injectable } from '@nestjs/common';
import { UserRepository } from '@core/repositories/user';
import { User } from '@core/entities/user';
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
    private readonly accountRepository: UserRepository,
    private readonly exception: ExceptionsAdapter,
  ) {}

  async execute(data: CreateAccountParams): Promise<User | void> {
    const accountExists = await this.accountRepository.findByEmail(data.email);

    if (accountExists) {
      return this.exception.conflict({
        message: ErrorMessages[ExceptionCode.ACCOUNT_ALREADY_EXISTS],
        code: ExceptionCode.ACCOUNT_ALREADY_EXISTS,
      });
    }

    const accountExistsByApiKey = await this.accountRepository.findByApiKey(
      data.apiKey,
    );

    if (accountExistsByApiKey) {
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
