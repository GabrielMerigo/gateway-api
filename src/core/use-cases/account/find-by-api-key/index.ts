import { Injectable } from '@nestjs/common';
import { Account } from '@core/entities/account';
import { AccountRepository } from '@core/repositories/account';

interface FindByApiKeyParams {
  apiKey: string;
}

@Injectable()
export class FindByApiKeyAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(data: FindByApiKeyParams): Promise<Account | null> {
    return await this.accountRepository.findByApiKey(data.apiKey);
  }
}
