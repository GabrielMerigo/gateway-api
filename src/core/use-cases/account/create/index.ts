import { Injectable } from '@nestjs/common';
import { AccountRepository } from '@core/repositories/account-repository';
import { Account } from '@core/entities/account-entity';

interface CreateAccountParams {
  name: string;
  email: string;
  apiKey: string;
  balance: number;
}

@Injectable()
export class CreateAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(data: CreateAccountParams): Promise<Account> {
    return await this.accountRepository.create({
      name: data.name,
      email: data.email,
      apiKey: data.apiKey,
      balance: data.balance,
    });
  }
}
